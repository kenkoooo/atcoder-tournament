use anyhow::Result;
use std::fs::{read_to_string, File};
use std::io::BufReader;
use tournament_tools::{construct_tournament, User};

#[test]
fn construct_integration_test() -> Result<()> {
    let ratings: Vec<User> = serde_json::from_reader(BufReader::new(File::open(
        "../data/season-5/ratings-5.json",
    )?))?;
    let registered_user_ids: Vec<String> =
        serde_json::from_reader(BufReader::new(File::open("../data/season-5/users-5.json")?))?;
    let previous_brackets =
        serde_json::from_reader(BufReader::new(File::open("../public/bracket-4.json")?))?;
    let brackets = construct_tournament(ratings, registered_user_ids, previous_brackets);

    assert_eq!(
        serde_json::to_string_pretty(&brackets)?,
        read_to_string("./tests/assets/bracket-5-construct.json",)?
    );
    Ok(())
}
