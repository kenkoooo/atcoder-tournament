use anyhow::Result;
use cli::common::construct_season_3::construct_season_3_tournament;
use cli::{load_previous_ranking, load_season_user_list};
use std::fs::write;

fn main() -> Result<()> {
    let previous_ranks = load_previous_ranking("2")?;
    let users = load_season_user_list(3)?;
    let response_map = construct_season_3_tournament(users, previous_ranks);

    write(
        "./public/bracket-3.json",
        serde_json::to_string(&response_map)?,
    )?;

    Ok(())
}
