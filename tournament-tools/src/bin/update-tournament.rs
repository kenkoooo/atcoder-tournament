use anyhow::Result;
use std::env;
use tournament_tools::{load_standings_list, read_brackets, update_tournament, write_brackets};

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let season_id: u32 = args[1].parse()?;

    let standings_list = load_standings_list(season_id)?;
    let mut brackets = read_brackets(season_id)?;
    update_tournament(&mut brackets, &standings_list);

    write_brackets(season_id, &brackets)?;
    Ok(())
}
