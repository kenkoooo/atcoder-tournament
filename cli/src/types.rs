use serde::{Deserialize, Serialize};
use std::cmp::{Ordering, Reverse};
use std::collections::BTreeMap;

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug)]
pub struct User {
    pub user_id: String,
    pub rating: i64,
}

impl User {
    pub fn resolve_result(
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
            (None, Some(_)) => BattleResult::SkipLose,
            (None, None) => self.same_rank(opponent),
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
    pub fn resolve(
        &mut self,
        standings: &BTreeMap<String, i64>,
        battle_results: &mut BTreeMap<String, Vec<BattleResultDetail<'a>>>,
        losers: &mut Vec<&'a User>,
    ) {
        let children_filled = self
            .children
            .iter()
            .all(|child| child.user.is_some() && child.rank.is_none());
        if children_filled {
            for child in self.children.iter_mut() {
                if let Some(rank) = standings.get(&child.user.unwrap().user_id) {
                    child.rank = Some(*rank);
                }
            }
            let winner = self
                .children
                .iter()
                .min_by_key(|user| {
                    (
                        user.rank.unwrap_or(1000000),
                        Reverse(user.user.unwrap().rating),
                        user.user.unwrap().user_id.to_lowercase(),
                    )
                })
                .unwrap()
                .user
                .unwrap();
            self.user = Some(winner);

            for child in self.children.iter_mut() {
                let user = child.user.unwrap();
                if user.user_id == winner.user_id {
                    if let Some(rank) = child.rank {
                        battle_results
                            .entry(user.user_id.clone())
                            .or_insert_with(Vec::new)
                            .push(BattleResultDetail {
                                opponent: Some(winner),
                                result: BattleResult::Win { rank },
                            });
                    } else {
                        child.rank = Some(1000000);
                        battle_results
                            .entry(user.user_id.clone())
                            .or_insert_with(Vec::new)
                            .push(BattleResultDetail {
                                opponent: Some(winner),
                                result: BattleResult::SkipWin,
                            });
                    }
                } else {
                    losers.push(user);
                    if let Some(rank) = child.rank {
                        battle_results
                            .entry(user.user_id.clone())
                            .or_insert_with(Vec::new)
                            .push(BattleResultDetail {
                                opponent: Some(winner),
                                result: BattleResult::Lose { rank },
                            });
                    } else {
                        child.rank = Some(1000000);
                        battle_results
                            .entry(user.user_id.clone())
                            .or_insert_with(Vec::new)
                            .push(BattleResultDetail {
                                opponent: Some(winner),
                                result: BattleResult::SkipLose,
                            });
                    }
                }
            }
        } else {
            for child in self.children.iter_mut() {
                child.resolve(standings, battle_results, losers);
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
}