use crate::io::{read_json, write_json};
use crate::types::{ClassId, Rank, SeasonId, UserId};
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::cmp::{Ordering, Reverse};
use std::collections::BTreeMap;

const INF_RANK: Rank = 1000000;

pub fn read_brackets(season_id: SeasonId) -> Result<BTreeMap<ClassId, Bracket>> {
    let path = format!("./public/bracket-{season_id}.json", season_id = season_id);
    read_json(path)
}
pub fn write_brackets(season_id: SeasonId, brackets: &BTreeMap<ClassId, Bracket>) -> Result<()> {
    let path = format!("./public/bracket-{season_id}.json", season_id = season_id);
    write_json(path, brackets)
}

#[derive(Serialize, Deserialize)]
pub struct Bracket {
    node: BracketNode,
    league: Vec<UserLeagueEntry>,
}

#[derive(Serialize, Deserialize)]
pub struct BracketNode {
    pub user: Option<User>,
    pub rank: Option<Rank>,
    pub children: Vec<BracketNode>,
}

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq)]
pub struct User {
    pub user_id: UserId,
    pub rating: u32,
}

#[derive(Serialize, Deserialize, PartialEq)]
pub struct UserLeagueEntry {
    user: User,
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

        let average = sum / count as f64;
        self.rank_sum = 1.0 / average;
    }
}

#[derive(Serialize, Deserialize, Clone, PartialEq)]
pub struct LeagueBattleResult {
    opponent: User,
    result: BattleResult,
}

impl LeagueBattleResult {
    fn judge(player: &User, player_rank: Rank, opponent: &User, opponent_rank: Rank) -> Self {
        let is_win = player_rank < opponent_rank
            || (player_rank == opponent_rank && player.rating > opponent.rating);
        let is_skipped = player_rank == INF_RANK;

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
        match self {
            BattleResult::Win { .. } | BattleResult::SkipWin => true,
            _ => false,
        }
    }
}

impl Bracket {
    pub fn update_tournament_result(&mut self, result: &[BTreeMap<UserId, Rank>]) {
        let height = self.node.get_subtree_height();
        self.node.update_subtree_result(result, height - 1);
    }

    pub fn consolidate_tournament_battle_result(
        &self,
    ) -> BTreeMap<UserId, (User, Vec<LeagueBattleResult>)> {
        let mut result = BTreeMap::new();
        self.node.consolidate_tournament_result(&mut result);
        result
    }

    pub fn update_league_result(&mut self, standings: &[BTreeMap<UserId, Rank>]) {
        let league_length = self
            .league
            .iter()
            .map(|entry| entry.results.len())
            .max()
            .unwrap_or(0);
        if self
            .league
            .iter()
            .any(|entry| entry.results.len() != league_length)
        {
            unreachable!("different league length");
        }
        if self.league.is_empty() {
            return;
        }

        assert_eq!(league_length, standings.len());
        assert!(league_length > 1);
        let pos = league_length - 1;
        let standings = &standings[pos];
        for entry in self.league.iter_mut() {
            assert_eq!(entry.results[pos].result, BattleResult::NotYet);

            let player = &entry.user;
            let opponent = &entry.results[pos].opponent;

            let player_rank = standings.get(&player.user_id).cloned().unwrap_or(INF_RANK);
            let opponent_rank = standings
                .get(&opponent.user_id)
                .cloned()
                .unwrap_or(INF_RANK);
            let result = LeagueBattleResult::judge(player, player_rank, opponent, opponent_rank);
            entry.results[pos] = result;
        }
    }

    pub fn extend_league(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        let league_length = self
            .league
            .iter()
            .map(|entry| entry.results.len())
            .max()
            .unwrap_or(1);
        assert!(self
            .league
            .iter()
            .all(|entry| entry.results.len() == league_length));
        assert!(league_length > 0);
        for (user, results) in tournament_battle_result.values() {
            assert!(results.len() <= league_length);
            if results.len() == league_length && !results[results.len() - 1].result.is_win() {
                let results = results.clone();
                let user = user.clone();
                self.league.push(UserLeagueEntry {
                    user,
                    win_count: 0,
                    rank_sum: 0.0,
                    results,
                    provisional_rank: 0,
                });
            }
        }
    }

    pub fn refresh_league_ranking(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        for entry in self.league.iter_mut() {
            entry.refresh();
        }

        self.league.sort();
        let remaining_user_count = tournament_battle_result
            .values()
            .filter(|user_entry| user_entry.1.iter().all(|result| result.result.is_win()))
            .count();
        for (i, entry) in self.league.iter_mut().enumerate() {
            entry.provisional_rank = i + remaining_user_count + 1;
        }
    }
}

impl BracketNode {
    fn get_subtree_height(&self) -> usize {
        let max = self
            .children
            .iter()
            .map(|child| child.get_subtree_height())
            .max()
            .unwrap_or(0);
        max + 1
    }

    fn update_subtree_result(&mut self, result: &[BTreeMap<UserId, Rank>], pos: usize) {
        if self.rank.is_some() {
            return;
        }
        if let Some(user) = self.user.as_ref() {
            if let Some(rank) = result
                .get(pos)
                .map(|result| get_rank(result, &user.user_id))
            {
                self.rank = Some(rank);
            }
            return;
        }
        assert!(self.user.is_none());

        for child in self.children.iter_mut() {
            assert!(pos > 0);
            child.update_subtree_result(result, pos - 1);
        }
        if self.children.iter().any(|child| child.rank.is_none()) {
            return;
        }

        let winner = pick_winner(self.children.iter())
            .and_then(|child| child.user.clone())
            .expect("no winner");
        let rank = result
            .get(pos)
            .map(|result| get_rank(result, &winner.user_id));
        self.user = Some(winner);
        self.rank = rank;
    }

    fn consolidate_tournament_result(
        &self,
        result: &mut BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        for child in self.children.iter() {
            child.consolidate_tournament_result(result);
        }

        let winner = match self.user.as_ref() {
            Some(winner) => winner,
            None => return,
        };
        if self.children.is_empty() {
            return;
        }
        assert!(self.children.len() >= 2, "Single child is not supported");

        let second = pick_winner(
            self.children
                .iter()
                .filter(|child| child.user.as_ref() != Some(winner)),
        );
        let second_player = second
            .and_then(|second| second.user.as_ref())
            .expect("Though the winner is filled, second is not filled");
        let second_rank = second
            .and_then(|second| second.rank)
            .expect("Though the winner is filled, second rank is not filled");
        for child in self.children.iter() {
            let player = child
                .user
                .as_ref()
                .expect("Though the winner is filled, children are not filled");
            let player_rank = child
                .rank
                .expect("Though the winner is filled, rank is not filled");
            let battle_result = if player == winner {
                LeagueBattleResult::judge(player, player_rank, second_player, second_rank)
            } else {
                LeagueBattleResult::judge(player, player_rank, winner, 0)
            };

            result
                .entry(player.user_id.clone())
                .or_insert_with(|| (player.clone(), Vec::new()))
                .1
                .push(battle_result);
        }
    }
}

fn get_rank(result: &BTreeMap<UserId, Rank>, user_id: &UserId) -> Rank {
    result.get(user_id).cloned().unwrap_or(INF_RANK)
}

fn pick_winner<'a, T: Iterator<Item = &'a BracketNode>>(children: T) -> Option<&'a BracketNode> {
    children.min_by_key(|child| {
        (
            child.rank.expect("rank is not filled"),
            Reverse(child.user.as_ref().map(|user| user.rating)),
        )
    })
}
