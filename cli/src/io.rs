use crate::types::Standings;
use crate::User;
use anyhow::Result;
use std::collections::BTreeMap;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

fn read_from_file<T: serde::de::DeserializeOwned, P: AsRef<Path>>(path: P) -> Result<T> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let result = serde_json::from_reader(reader)?;
    Ok(result)
}

pub fn load_season_user_list(season_id: u32) -> Result<Vec<User>> {
    let users: Vec<String> = read_from_file(format!(
        "./data/season-{season_id}/users-{season_id}.json",
        season_id = season_id
    ))?;
    let ratings: Vec<User> = read_from_file(format!(
        "./data/season-{season_id}/ratings-{season_id}.json",
        season_id = season_id
    ))?;
    let mut rating_map = BTreeMap::new();
    for rating in ratings {
        let lower_user = rating.user_id.to_lowercase();
        rating_map.insert(lower_user, rating);
    }

    let mut result = vec![];
    for user_id in users {
        if let Some(user) = rating_map.remove(&user_id.to_lowercase()) {
            result.push(user);
        }
    }

    Ok(result)
}

pub fn load_standings(filename: &str) -> Result<BTreeMap<String, i64>> {
    let standings: Standings = read_from_file(filename)?;
    let mut map = BTreeMap::new();
    for standing in standings.standings {
        if standing.contest_result.score > 0 {
            map.insert(standing.username, standing.rank);
        }
    }
    Ok(map)
}
