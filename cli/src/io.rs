use crate::common::RatingStorage;
use crate::types::Standings;
use crate::{Node, Response, User};
use anyhow::{Context, Result};
use std::collections::BTreeMap;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

pub fn read_from_file<T: serde::de::DeserializeOwned, P: AsRef<Path>>(path: P) -> Result<T> {
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

    let rating_storage = RatingStorage::new(&ratings);
    let mut result = vec![];
    for user_id in users {
        if let Some(user) = rating_storage.get_rating(&user_id) {
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

pub fn load_previous_ranking(season_id: &str) -> Result<BTreeMap<String, BTreeMap<String, u32>>> {
    let filepath = format!("./public/bracket-{}.json", season_id);
    let responses: BTreeMap<String, Response> = read_from_file(filepath)?;
    convert_previous_ranking(responses)
}

pub fn parse_previous_ranking(content: &str) -> Result<BTreeMap<String, BTreeMap<String, u32>>> {
    let responses: BTreeMap<String, Response> = serde_json::from_str(content)?;
    convert_previous_ranking(responses)
}

fn convert_previous_ranking(
    responses: BTreeMap<String, Response>,
) -> Result<BTreeMap<String, BTreeMap<String, u32>>> {
    responses
        .into_iter()
        .map(|(class, Response { league, node, .. })| {
            let mut rank_by_user = league
                .unwrap_or_else(Vec::new)
                .into_iter()
                .map(|entry| {
                    let rank = entry.provisional_rank;
                    let user_id = entry.user.user_id;
                    (user_id, rank)
                })
                .collect::<BTreeMap<_, _>>();
            let Node { user, children, .. } = node;
            let winner = user.context("tournament is not finished")?.user_id;
            let second = children
                .into_iter()
                .flat_map(|node| node.user)
                .find(|user| &user.user_id != &winner)
                .context("no 1st runner up")?
                .user_id;
            rank_by_user.insert(winner, 1);
            rank_by_user.insert(second, 2);

            Ok((class, rank_by_user))
        })
        .collect()
}
