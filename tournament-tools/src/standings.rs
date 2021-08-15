use crate::io::read_json;
use crate::types::{Rank, SeasonId, UserId};
use anyhow::Result;
use serde::Deserialize;
use std::collections::BTreeMap;

pub fn read_standings(season_id: SeasonId, standings_name: &str) -> Result<BTreeMap<UserId, Rank>> {
    let path = format!(
        "./data/season-{season_id}/{standings_name}.json",
        season_id = season_id,
        standings_name = standings_name
    );
    let standings: Standings = read_json(path)?;
    let mut map = BTreeMap::new();
    for user in standings
        .standings
        .into_iter()
        .filter(|u| u.contest_result.score > 0)
    {
        map.insert(user.user_id, user.rank);
    }
    Ok(map)
}

#[derive(Deserialize)]
struct Standings {
    #[serde(rename = "StandingsData")]
    standings: Vec<StandingUser>,
}

#[derive(Deserialize)]
struct StandingUser {
    #[serde(rename = "Rank")]
    rank: Rank,

    #[serde(rename = "UserScreenName")]
    user_id: UserId,

    #[serde(rename = "TotalResult")]
    contest_result: ContestResult,
}

#[derive(Deserialize)]
struct ContestResult {
    #[serde(rename = "Score")]
    score: i64,
}
