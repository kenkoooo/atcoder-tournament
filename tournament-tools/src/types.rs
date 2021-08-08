use serde::{Deserialize, Serialize};

pub(crate) type Rank = u32;
pub type SeasonId = u32;
pub(crate) type UserId = String;

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

#[derive(Serialize, Deserialize)]
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

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;
    use std::fs::read_to_string;

    #[test]
    fn test_load_brackets() {
        let s = read_to_string("../public/bracket-4.json").unwrap();
        assert!(serde_json::from_str::<HashMap<String, Bracket>>(&s).is_ok())
    }
}
