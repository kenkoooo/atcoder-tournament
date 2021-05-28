use anyhow::Result;
use cli::{read_from_file, Response};
use std::collections::BTreeMap;

fn main() -> Result<()> {
    for season in 1..=3 {
        let filepath = format!("./public/bracket-{}.json", season);
        let responses: BTreeMap<String, Response> = read_from_file(filepath)?;
        eprintln!("{} {}", season, responses.len());
    }
    Ok(())
}
