use anyhow::Result;
use std::collections::BTreeMap;
use std::fs::{read_to_string, File};
use std::io::BufReader;
use tournament_tools::{read_standings_from_path, Bracket};

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
    for bracket in brackets.values_mut() {
        bracket.update_tournament_result(&standings_list);
        bracket.update_league_result(&standings_list);

        let tournament_battle_result = bracket.consolidate_tournament_battle_result();
        bracket.extend_league(&tournament_battle_result);
        bracket.refresh_league_ranking(&tournament_battle_result);
        bracket.match_new_league_games();
    }

    assert_eq!(
        serde_json::to_string_pretty(&brackets)?,
        read_to_string("./tests/assets/bracket-5-after.json",)?
    );
    Ok(())
}
