use crate::bracket::User;
use crate::types::{Rank, UserId, INF_RANK};
use serde::{Deserialize, Serialize};
use std::cmp::Ordering;
use std::collections::BTreeMap;

pub(crate) trait LeagueUtil {
    fn update_league_result(&mut self, standings: &[BTreeMap<UserId, Rank>]);
    fn extend_league(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    );
    fn refresh_league_ranking(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    );

    #[cfg(feature = "league_matching")]
    fn match_new_games(&mut self);
}

impl LeagueUtil for Vec<UserLeagueEntry> {
    fn update_league_result(&mut self, standings: &[BTreeMap<UserId, Rank>]) {
        let league_length = self
            .iter()
            .map(|entry| entry.results.len())
            .max()
            .unwrap_or(0);
        if self
            .iter()
            .any(|entry| entry.results.len() != league_length)
        {
            unreachable!("different league length");
        }
        if self.is_empty() {
            return;
        }

        assert_eq!(league_length, standings.len());
        assert!(league_length > 1);
        let pos = league_length - 1;
        let standings = &standings[pos];
        for entry in self.iter_mut() {
            assert_eq!(entry.results[pos].result, BattleResult::NotYet);

            let player = &entry.user;
            let opponent = &entry.results[pos].opponent;

            let player_rank = standings.get(&player.user_id).cloned().unwrap_or(INF_RANK);
            let opponent_rank = standings
                .get(&opponent.user_id)
                .cloned()
                .unwrap_or(INF_RANK);
            let result =
                LeagueBattleResult::judge_for_league(player, player_rank, opponent, opponent_rank);
            entry.results[pos] = result;
        }
    }

    fn extend_league(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        let league_length = self
            .iter()
            .map(|entry| entry.results.len())
            .max()
            .unwrap_or(1);
        assert!(self
            .iter()
            .all(|entry| entry.results.len() == league_length));
        assert!(league_length > 0);

        let mut new_losers = vec![];
        for (user, results) in tournament_battle_result.values() {
            assert!(results.len() <= league_length);
            if results.len() == league_length && !results[results.len() - 1].result.is_win() {
                let results = results.clone();
                let user = user.clone();
                new_losers.push(UserLeagueEntry {
                    user,
                    win_count: 0,
                    rank_sum: 0.0,
                    results,
                    provisional_rank: 0,
                });
            }
        }

        if new_losers.len() > 1 {
            self.extend(new_losers);
        }
    }

    fn refresh_league_ranking(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        for entry in self.iter_mut() {
            entry.refresh();
        }

        self.sort();
        let remaining_user_count = tournament_battle_result
            .values()
            .filter(|user_entry| user_entry.1.iter().all(|result| result.result.is_win()))
            .count();
        for (i, entry) in self.iter_mut().enumerate() {
            entry.provisional_rank = i + remaining_user_count.max(2) + 1;
        }
    }

    #[cfg(feature = "league_matching")]
    fn match_new_games(&mut self) {
        let n = self.len();
        assert!(n >= 2);

        let mut offset = 0;
        while offset + 2 <= n {
            let win_count = self[offset].win_count;
            let mut same_win_idx = vec![];
            while offset + 1 < n && self[offset].win_count == win_count {
                same_win_idx.push(offset);
                same_win_idx.push(offset + 1);
                offset += 2;
            }

            assert_eq!(same_win_idx.len() % 2, 0);
            let pairs = same_win_idx.len() / 2;
            use rand::prelude::*;
            let mut rng = StdRng::seed_from_u64(717);
            for _ in 0..20 {
                same_win_idx.shuffle(&mut rng);
                let mut ok = true;
                for i in 0..pairs {
                    let ia = same_win_idx[i];
                    let ib = same_win_idx[i + pairs];
                    if is_matched_before(&self[ia].results, &self[ib].user) {
                        ok = false;
                        break;
                    }
                }

                if ok {
                    break;
                }
            }

            for i in 0..pairs {
                let ia = same_win_idx[i];
                let ib = same_win_idx[i + pairs];

                let user_a = self[ia].user.clone();
                let user_b = self[ib].user.clone();
                self[ia].results.push(LeagueBattleResult {
                    opponent: user_b,
                    result: BattleResult::NotYet,
                });
                self[ib].results.push(LeagueBattleResult {
                    opponent: user_a,
                    result: BattleResult::NotYet,
                });
            }
        }

        if offset != n {
            assert_eq!(offset + 1, n);
            assert_eq!(n % 2, 1);
            assert!(n >= 3);
            let opponent = self[n - 2].user.clone();
            self[n - 1].results.push(LeagueBattleResult {
                opponent,
                result: BattleResult::NotYet,
            });
        }
    }
}

fn is_matched_before(user_results: &[LeagueBattleResult], opponent: &User) -> bool {
    user_results
        .iter()
        .any(|result| &result.opponent == opponent)
}

#[derive(Serialize, Deserialize, PartialEq)]
pub struct UserLeagueEntry {
    pub(crate) user: User,
    win_count: usize,
    rank_sum: f64,
    results: Vec<LeagueBattleResult>,
    provisional_rank: usize,
}

impl Eq for UserLeagueEntry {}

impl Ord for UserLeagueEntry {
    fn cmp(&self, other: &Self) -> Ordering {
        self.partial_cmp(&other).unwrap()
    }
}

impl PartialOrd for UserLeagueEntry {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(
            other
                .win_count
                .cmp(&self.win_count)
                .then(self.rank_sum.partial_cmp(&other.rank_sum).unwrap())
                .then(other.user.rating.cmp(&self.user.rating)),
        )
    }
}

impl UserLeagueEntry {
    fn refresh(&mut self) {
        self.win_count = self.results.iter().filter(|x| x.result.is_win()).count();

        let mut sum = 0.0;
        let mut count = 0;
        for result in self.results.iter() {
            match result.result {
                BattleResult::Win { rank } | BattleResult::Lose { rank } => {
                    sum += 1.0 / rank as f64;
                    count += 1;
                }
                BattleResult::SkipLose | BattleResult::SkipWin => {
                    count += 1;
                }
                BattleResult::Writer | BattleResult::NotYet => {}
            }
        }

        if sum == 0.0 {
            self.rank_sum = INF_RANK as f64;
        } else if count > 0 {
            let average = sum / count as f64;
            self.rank_sum = 1.0 / average;
        } else {
            self.rank_sum = 0.0;
        }
    }
}

#[derive(Serialize, Deserialize, Clone, PartialEq)]
pub struct LeagueBattleResult {
    opponent: User,
    result: BattleResult,
}

impl LeagueBattleResult {
    fn judge(
        player: &User,
        player_rank: Rank,
        opponent: &User,
        opponent_rank: Rank,
        is_league: bool,
    ) -> Self {
        let is_win = player_rank < opponent_rank
            || (player_rank == opponent_rank && player.rating > opponent.rating);
        let is_skipped = player_rank == INF_RANK;

        if is_skipped && is_league {
            return LeagueBattleResult {
                opponent: opponent.clone(),
                result: BattleResult::SkipLose,
            };
        }

        match (is_win, is_skipped) {
            (true, true) => LeagueBattleResult {
                opponent: opponent.clone(),
                result: BattleResult::SkipWin,
            },
            (true, false) => LeagueBattleResult {
                opponent: opponent.clone(),
                result: BattleResult::Win { rank: player_rank },
            },
            (false, true) => LeagueBattleResult {
                opponent: opponent.clone(),
                result: BattleResult::SkipLose,
            },
            (false, false) => LeagueBattleResult {
                opponent: opponent.clone(),
                result: BattleResult::Lose { rank: player_rank },
            },
        }
    }
    fn judge_for_league(
        player: &User,
        player_rank: Rank,
        opponent: &User,
        opponent_rank: Rank,
    ) -> Self {
        Self::judge(player, player_rank, opponent, opponent_rank, true)
    }

    pub(crate) fn judge_for_tournament(
        player: &User,
        player_rank: Rank,
        opponent: &User,
        opponent_rank: Rank,
    ) -> Self {
        Self::judge(player, player_rank, opponent, opponent_rank, false)
    }
}

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug, Clone)]
#[serde(tag = "result")]
pub enum BattleResult {
    Win { rank: Rank },
    Lose { rank: Rank },
    SkipLose,
    SkipWin,
    Writer,
    NotYet,
}

impl BattleResult {
    fn is_win(&self) -> bool {
        matches!(self, BattleResult::Win { .. } | BattleResult::SkipWin)
    }
}
