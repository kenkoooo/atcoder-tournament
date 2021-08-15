use anyhow::Result;
use std::env;
use tournament_tools::{
    construct_tournament, load_rating, load_user_ids, read_brackets, write_brackets,
};

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let season_id: u32 = args[1].parse()?;
    let ratings = load_rating(season_id)?;
    let registered_user_ids = load_user_ids(season_id)?;
    let previous_brackets = read_brackets(season_id - 1)?;

    let brackets = construct_tournament(ratings, registered_user_ids, previous_brackets);

    write_brackets(season_id, &brackets)?;

    Ok(())
}
