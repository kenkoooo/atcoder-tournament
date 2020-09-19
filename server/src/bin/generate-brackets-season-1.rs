use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::cmp::Reverse;
use std::collections::{BTreeMap, BTreeSet};
use std::fs::read_to_string;
use std::iter::FromIterator;

const MAX_NUM: usize = 128;

#[derive(Debug, Serialize, Deserialize)]
struct UserRating {
    user_id: String,
    rating: i64,
}

#[derive(Debug, Serialize)]
struct Node<'a> {
    user: Option<&'a UserRating>,
    children: Vec<Node<'a>>,
}

fn main() -> Result<()> {
    let users = read_to_string("data/season-1/users-1.json")?;
    let users: Vec<String> = serde_json::from_str(&users)?;
    let users = BTreeSet::from_iter(users.into_iter());
    let ratings = read_to_string("data/season-1/ratings-1.json")?;
    let ratings: Vec<UserRating> = serde_json::from_str(&ratings)?;

    let mut registered_users = vec![];
    for rating in ratings {
        if users.contains(&rating.user_id) {
            registered_users.push(rating);
        }
    }

    registered_users.sort_by(|a, b| {
        if a.rating == b.rating {
            a.user_id.cmp(&b.user_id)
        } else {
            b.rating.cmp(&b.rating)
        }
    });

    let division_num = (registered_users.len() + MAX_NUM - 1) / MAX_NUM;
    let division_size = (registered_users.len() + division_num - 1) / division_num;

    let mut divisions = vec![];
    for _ in 0..division_num {
        let mut division = vec![];
        while division.len() < division_size {
            if let Some(user) = registered_users.pop() {
                division.push(user);
            } else {
                break;
            }
        }
        divisions.push(division);
    }
    divisions.reverse();

    let mut brackets = vec![];
    for mut division in divisions {
        division.reverse();

        let mut nodes = vec![];

        let mut second = division.split_off(MAX_NUM / 2);
        second.reverse();
        let first = division;
        for first in first {
            if let Some(second) = second.pop() {
                nodes.push(vec![first, second]);
            } else {
                nodes.push(vec![first]);
            }
        }
        brackets.push(nodes);
    }

    let mut divisions = vec![];
    for nodes in brackets.iter() {
        let mut division = vec![];
        for node in nodes.iter() {
            match node.len() {
                1 => division.push(Node {
                    user: Some(&node[0]),
                    children: vec![],
                }),
                2 => division.push(Node {
                    user: None,
                    children: vec![
                        Node {
                            user: Some(&node[0]),
                            children: vec![],
                        },
                        Node {
                            user: Some(&node[1]),
                            children: vec![],
                        },
                    ],
                }),
                _ => unreachable!(),
            }
        }

        divisions.push(division);
    }

    let standings = vec![];

    Ok(())
}

#[derive(Deserialize)]
struct Standings {
    #[serde(name = "StandingsData")]
    standings: Vec<Standing>,
}

#[derive(Deserialize)]
struct Standing {
    #[serde(name = "Rank")]
    rank: i64,

    #[serde(name = "UserName")]
    username: String,
}

fn load_standings(filename: &str) -> Result<Vec<Standing>> {
    let file = read_to_string(filename)?;
    let standings: Standings = serde_json::from_str(&file)?;
    standings.standings
}
