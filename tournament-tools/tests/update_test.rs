use anyhow::Result;
use std::collections::BTreeMap;
use std::fs::{read_to_string, File};
use std::io::BufReader;
use tournament_tools::{read_standings_from_path, update_tournament, Bracket};

#[test]
fn update_integration_test() -> Result<()> {
    let mut brackets: BTreeMap<String, Bracket> = serde_json::from_reader(BufReader::new(
        File::open("./tests/assets/bracket-5-before.json")?,
    ))?;

    let standings_list = vec![
        read_standings_from_path("../data/season-5/abc211.json")?,
        read_standings_from_path("../data/season-5/abc212.json")?,
        read_standings_from_path("../data/season-5/abc213.json")?,
        read_standings_from_path("../data/season-5/abc214.json")?,
    ];
    update_tournament(&mut brackets, &standings_list);

    assert_eq!(
        serde_json::to_string_pretty(&brackets)?,
        read_to_string("./tests/assets/bracket-5-after.json",)?
    );
    Ok(())
}
