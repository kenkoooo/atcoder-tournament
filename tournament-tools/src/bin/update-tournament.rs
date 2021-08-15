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
    for bracket in brackets.values_mut() {
        bracket.update_tournament_result(&standings_list);
        bracket.update_league_result(&standings_list);

        let tournament_battle_result = bracket.consolidate_tournament_battle_result();
        bracket.extend_league(&tournament_battle_result);
        bracket.refresh_league_ranking(&tournament_battle_result);
        bracket.match_new_league_games();
    }

    write_brackets(season_id, &brackets)?;
    Ok(())
}
