use anyhow::Result;
use std::env;
use tournament_tools::{read_config, read_standings};

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let season_id: u32 = args[1].parse()?;
    let config = read_config(season_id)?;

    let mut standings_list = vec![];
    for m in config.matches.iter() {
        let standings = read_standings(config.season, &m.standings)?;
        standings_list.push(standings);
    }

    Ok(())
}
