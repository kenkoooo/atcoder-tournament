use serde::{Deserialize, Serialize};
use std::cmp::{Ordering, Reverse};
use std::collections::BTreeMap;

const INF_RANK: i64 = 1000000;

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug, Clone)]
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
            (Some(user_rank), Some(opponent_rank)) => match user_rank.cmp(&opponent_rank) {
                Ordering::Equal => self.same_rank(opponent, user_rank),
                Ordering::Greater => BattleResult::Lose { rank: user_rank },
                Ordering::Less => BattleResult::Win { rank: user_rank },
            },
            (Some(my_rank), None) => BattleResult::Win { rank: my_rank },
            (None, _) => BattleResult::SkipLose,
        }
    }
    fn same_rank(&self, opponent: &User, rank: i64) -> BattleResult {
        match self.cmp(opponent) {
            Ordering::Less => BattleResult::Win { rank },
            Ordering::Greater => BattleResult::Lose { rank },
            _ => unreachable!("comparing the same user"),
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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Node {
    pub user: Option<User>,
    pub rank: Option<i64>,
    pub children: Vec<Node>,
}

impl Node {
    pub fn resolve_tournament_result(
        &mut self,
        standings: &BTreeMap<String, i64>,
        battle_results: &mut BTreeMap<String, Vec<BattleResultDetail>>,
        losers: &mut Vec<User>,
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
            if let Some(&rank) = standings.get(&child.user.as_ref().unwrap().user_id) {
                child.rank = Some(rank);
            }
        }

        let mut user_rank = self
            .children
            .iter()
            .map(|node| {
                let user = node.user.clone().unwrap();
                (user, node.rank.unwrap_or(INF_RANK))
            })
            .collect::<Vec<_>>();
        user_rank
            .sort_by_key(|(user, rank)| (*rank, Reverse(user.rating), user.user_id.to_lowercase()));
        let winner = user_rank[0].0.clone();
        self.user = Some(winner.clone());

        for child in self.children.iter_mut() {
            let user = child.user.clone().unwrap();
            let (result, opponent) = if user.user_id == winner.user_id {
                let second = user_rank[1].0.clone();
                if let Some(rank) = child.rank {
                    (BattleResult::Win { rank }, second)
                } else {
                    (BattleResult::SkipWin, second)
                }
            } else if let Some(rank) = child.rank {
                (BattleResult::Lose { rank }, winner.clone())
            } else {
                (BattleResult::SkipLose, winner.clone())
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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Response {
    pub node: Node,
    pub league: Vec<LeagueEntry>,
    pub defending_champion: Option<String>,
    pub drop_rank: Option<i32>,
    pub promotion_rank: Option<i32>,
    pub top4: Option<BTreeMap<i64, Vec<User>>>,
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

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BattleResultDetail {
    pub opponent: Option<User>,
    pub result: BattleResult,
}

#[derive(Serialize, Deserialize, Debug, Copy, Clone)]
#[serde(tag = "result")]
pub enum BattleResult {
    Win { rank: i64 },
    Lose { rank: i64 },
    SkipLose,
    SkipWin,
    Writer,
    NotYet,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LeagueEntry {
    pub user: User,
    pub win_count: i64,
    pub rank_sum: i64,
    pub results: Vec<BattleResultDetail>,
    pub provisional_rank: u32,
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_compare_users() {
        let user1 = User {
            rating: 100,
            user_id: "user1".to_string(),
        };
        let user2 = User {
            rating: 200,
            user_id: "user2".to_string(),
        };
        assert!(user1 > user2);
    }
}
