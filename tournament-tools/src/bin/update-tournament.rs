use anyhow::Result;
use std::env;
use tournament_tools::{read_brackets, read_config, read_standings, write_brackets};

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let season_id: u32 = args[1].parse()?;

    let config = read_config(season_id)?;

    let mut standings_list = vec![];
    for m in config.matches.iter() {
        let standings = read_standings(config.season, &m.standings)?;
        standings_list.push(standings);
    }

    let mut brackets = read_brackets(season_id)?;
    for (_, bracket) in brackets.iter_mut() {
        bracket.update_result(&standings_list);
    }

    write_brackets(season_id, &brackets)?;
    Ok(())
}
