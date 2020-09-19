use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::cmp::{max, Reverse};
use std::collections::{BTreeMap, BTreeSet};
use std::fs::{read_to_string, write};
use std::iter::FromIterator;

const MAX_NUM: usize = 128;
const INF_RANK: i64 = 1 << 50;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct UserRating {
    user_id: String,
    rating: i64,
}

#[derive(Debug, Serialize, Clone)]
struct Node<'a> {
    user: Option<&'a UserRating>,
    rank: Option<i64>,
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
            a.user_id.to_lowercase().cmp(&b.user_id.to_lowercase())
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

        let mut first = 1;
        while first * 2 < division.len() {
            first *= 2;
        }

        let mut second = division.split_off(first);
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
                    rank: None,
                    children: vec![],
                }),
                2 => division.push(Node {
                    user: None,
                    rank: None,
                    children: vec![
                        Node {
                            user: Some(&node[0]),
                            rank: None,
                            children: vec![],
                        },
                        Node {
                            user: Some(&node[1]),
                            rank: None,
                            children: vec![],
                        },
                    ],
                }),
                _ => unreachable!(),
            }
        }

        while division.len() > 1 {
            assert_eq!(division.len() % 2, 0);
            let mut next = vec![];
            while !division.is_empty() {
                let second = division
                    .pop()
                    .ok_or_else(|| anyhow::anyhow!("division_length={}", division.len()))?;
                let first = division
                    .pop()
                    .ok_or_else(|| anyhow::anyhow!("division_length={}", division.len()))?;
                let node = Node {
                    user: None,
                    rank: None,
                    children: vec![first, second],
                };
                next.push(node);
            }
            next.reverse();
            division = next;
        }
        assert_eq!(division.len(), 1);
        divisions.push(division.pop().expect("unreachable"));
    }

    let standings = vec![
        load_standings("./data/season-1/abc177.json")?,
        load_standings("./data/season-1/abc178.json")?,
        load_standings("./data/season-1/abc179.json")?,
    ];

    let mut result = BTreeMap::new();
    for (division, class) in divisions
        .iter()
        .zip(["A", "B1", "B2", "C1", "C2", "C3"].iter())
    {
        let layer = get_layer(division);
        result.insert(class, resolve(division, &standings, layer));
    }

    write("./public/bracket-1.json", serde_json::to_string(&result)?)?;
    Ok(())
}

fn resolve<'a>(node: &'a Node, standings: &'a [BTreeMap<String, i64>], layer: usize) -> Node<'a> {
    let children = node
        .children
        .iter()
        .map(|child| resolve(child, standings, layer - 1))
        .collect::<Vec<_>>();
    let user = if !children.is_empty() && standings.len() >= layer {
        let mut sorting = children.clone();
        sorting.sort_by_key(|a| (a.rank.unwrap(), Reverse(a.user.unwrap().rating)));
        sorting[0].user
    } else {
        node.user
    };

    let rank = if standings.len() > layer {
        assert!(
            user.is_some(),
            "{:?} layer={} children={:?}",
            node,
            layer,
            children
        );
        match standings[layer].get(&user.unwrap().user_id) {
            Some(&rank) => Some(rank),
            None => Some(INF_RANK),
        }
    } else {
        None
    };
    Node {
        user,
        rank,
        children,
    }
}

fn get_layer(node: &Node) -> usize {
    assert!(node.children.len() == 0 || node.children.len() == 2);
    if node.children.is_empty() {
        0
    } else {
        max(get_layer(&node.children[0]), get_layer(&node.children[1])) + 1
    }
}

#[derive(Deserialize)]
struct Standings {
    #[serde(rename = "StandingsData")]
    standings: Vec<Standing>,
}

#[derive(Deserialize)]
struct Standing {
    #[serde(rename = "Rank")]
    rank: i64,

    #[serde(rename = "UserScreenName")]
    username: String,

    #[serde(rename = "TotalResult")]
    contest_result: ContestResult,
}

#[derive(Deserialize)]
struct ContestResult {
    #[serde(rename = "Score")]
    score: i64,
}

fn load_standings(filename: &str) -> Result<BTreeMap<String, i64>> {
    let file = read_to_string(filename)?;
    let standings: Standings = serde_json::from_str(&file)?;

    let mut map = BTreeMap::new();
    for standing in standings.standings {
        if standing.contest_result.score > 0 {
            map.insert(standing.username, standing.rank);
        }
    }
    Ok(map)
}
