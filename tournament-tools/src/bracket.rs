use crate::io::{read_json, write_json};
use crate::types::{ClassId, Rank, SeasonId, UserId};
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

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
    league: Vec<LeagueEntry>,
}

#[derive(Serialize, Deserialize)]
pub struct BracketNode {
    pub user: Option<User>,
    pub rank: Option<Rank>,
    pub children: Vec<BracketNode>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    pub user_id: UserId,
    pub rating: u32,
}

#[derive(Serialize, Deserialize)]
pub struct LeagueEntry {
    user: User,
    win_count: u32,
    rank_sum: f64,
    results: Vec<LeagueBattleResult>,
    provisional_rank: Rank,
}

#[derive(Serialize, Deserialize)]
pub struct LeagueBattleResult {
    opponent: User,
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "result")]
pub enum BattleResult {
    Win { rank: Rank },
    Lose { rank: Rank },
    SkipLose,
    SkipWin,
    Writer,
    NotYet,
}

impl Bracket {
    pub fn update_result(&mut self, result: &[BTreeMap<UserId, Rank>]) {
        let height = self.node.get_subtree_height();
        self.node.update_subtree_result(result, height - 1);
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

        let winner = self
            .children
            .iter()
            .min_by_key(|child| child.rank)
            .and_then(|child| child.user.clone())
            .expect("no winner");
        let rank = result
            .get(pos)
            .map(|result| get_rank(result, &winner.user_id));
        self.user = Some(winner);
        self.rank = rank;
    }
}

fn get_rank(result: &BTreeMap<UserId, Rank>, user_id: &UserId) -> Rank {
    result
        .get(user_id)
        .cloned()
        .unwrap_or(result.len() as Rank + 1)
}
