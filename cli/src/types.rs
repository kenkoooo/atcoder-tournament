use serde::{Deserialize, Serialize};
use std::cmp::{Ordering, Reverse};
use std::collections::BTreeMap;

const INF_RANK: i64 = 1000000;

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug)]
pub struct User {
    pub user_id: String,
    pub rating: i64,
}

impl User {
    pub fn resolve_league_match_result(
        &self,
        opponent: &User,
        user_rank: Option<i64>,
        opponent_rank: Option<i64>,
    ) -> BattleResult {
        match (user_rank, opponent_rank) {
            (Some(user_rank), Some(opponent_rank)) => {
                if user_rank == opponent_rank {
                    self.same_rank(opponent)
                } else if user_rank < opponent_rank {
                    BattleResult::Win { rank: user_rank }
                } else {
                    BattleResult::Lose { rank: user_rank }
                }
            }
            (Some(my_rank), None) => BattleResult::Win { rank: my_rank },
            (None, _) => BattleResult::SkipLose,
        }
    }
    fn same_rank(&self, opponent: &User) -> BattleResult {
        if self.rating == opponent.rating {
            if self.user_id > opponent.user_id {
                BattleResult::SkipWin
            } else {
                BattleResult::SkipLose
            }
        } else if self.rating > opponent.rating {
            BattleResult::SkipWin
        } else {
            BattleResult::SkipLose
        }
    }
}

impl Ord for User {
    fn cmp(&self, other: &Self) -> Ordering {
        (Reverse(self.rating), self.user_id.to_lowercase().as_str())
            .cmp(&(Reverse(other.rating), other.user_id.to_lowercase().as_str()))
    }
}
impl PartialOrd for User {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

#[derive(Debug, Serialize, Clone)]
pub struct Node<'a> {
    pub user: Option<&'a User>,
    pub rank: Option<i64>,
    pub children: Vec<Node<'a>>,
}

impl<'a> Node<'a> {
    pub fn resolve_tournament_result(
        &mut self,
        standings: &BTreeMap<String, i64>,
        battle_results: &mut BTreeMap<String, Vec<BattleResultDetail<'a>>>,
        losers: &mut Vec<&'a User>,
    ) {
        let children_filled = self
            .children
            .iter()
            .all(|child| child.user.is_some() && child.rank.is_none());
        if !children_filled {
            for child in self.children.iter_mut() {
                child.resolve_tournament_result(standings, battle_results, losers);
            }
            return;
        }

        for child in self.children.iter_mut() {
            if let Some(&rank) = standings.get(&child.user.unwrap().user_id) {
                child.rank = Some(rank);
            }
        }

        let mut user_rank = self
            .children
            .iter()
            .map(|node| {
                let user = node.user.unwrap();
                (user, node.rank.unwrap_or(INF_RANK))
            })
            .collect::<Vec<_>>();
        user_rank
            .sort_by_key(|&(user, rank)| (rank, Reverse(user.rating), user.user_id.to_lowercase()));
        self.user = Some(user_rank[0].0);
        let winner = user_rank[0].0;

        for child in self.children.iter_mut() {
            let user = child.user.unwrap();
            let (result, opponent) = if user.user_id == winner.user_id {
                let second = user_rank[1].0;
                if let Some(rank) = child.rank {
                    (BattleResult::Win { rank }, second)
                } else {
                    (BattleResult::SkipWin, second)
                }
            } else {
                if let Some(rank) = child.rank {
                    (BattleResult::Lose { rank }, winner)
                } else {
                    (BattleResult::SkipLose, winner)
                }
            };
            child.rank = Some(child.rank.unwrap_or(INF_RANK));
            battle_results
                .entry(user.user_id.clone())
                .or_insert_with(Vec::new)
                .push(BattleResultDetail {
                    opponent: Some(opponent),
                    result,
                });

            if user.user_id != winner.user_id {
                losers.push(user);
            }
        }
    }
}

#[derive(Debug, Serialize, Clone)]
pub struct Response<'a> {
    pub node: Node<'a>,
    pub league: Vec<LeagueEntry<'a>>,
}

#[derive(Deserialize)]
pub struct StandingUser {
    #[serde(rename = "Rank")]
    pub rank: i64,

    #[serde(rename = "UserScreenName")]
    pub username: String,

    #[serde(rename = "TotalResult")]
    pub contest_result: ContestResult,
}
#[derive(Deserialize)]
pub struct ContestResult {
    #[serde(rename = "Score")]
    pub score: i64,
}

#[derive(Deserialize)]
pub struct Standings {
    #[serde(rename = "StandingsData")]
    pub standings: Vec<StandingUser>,
}

#[derive(Serialize, Debug, Clone)]
pub struct BattleResultDetail<'a> {
    pub opponent: Option<&'a User>,
    pub result: BattleResult,
}

#[derive(Serialize, Debug, Copy, Clone)]
#[serde(tag = "result")]
pub enum BattleResult {
    Win { rank: i64 },
    Lose { rank: i64 },
    SkipLose,
    SkipWin,
    Writer,
    NotYet,
}

#[derive(Serialize, Debug, Clone)]
pub struct LeagueEntry<'a> {
    pub user: &'a User,
    pub win_count: i64,
    pub rank_sum: i64,
    pub results: Vec<BattleResultDetail<'a>>,
    pub provisional_rank: u32,
}
