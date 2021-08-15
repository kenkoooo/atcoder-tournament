use crate::io::read_json;
use crate::types::{SeasonId, UserId};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct TournamentConfig {
    pub season: SeasonId,
    pub defending_champion: UserId,
    pub matches: Vec<Match>,
}

#[derive(Serialize, Deserialize)]
pub struct Match {
    pub standings: String,
    pub writers: Vec<UserId>,
}

pub fn read_config(season_id: SeasonId) -> Result<TournamentConfig> {
    let path = format!(
        "./data/season-{season_id}/config-{season_id}.json",
        season_id = season_id
    );
    read_json(path)
}
