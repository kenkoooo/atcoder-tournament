use anyhow::Result;
use cli::{load_season_user_list, Node, Response, User};
use std::collections::BTreeMap;
use std::fs::write;

const CLASS_KEY: [&str; 4] = ["A", "B", "C", "D"];

fn main() -> Result<()> {
    let users = load_season_user_list(2)?;

    let mut classes = vec![vec![]; 4];
    for user in users.iter() {
        if user.rating >= 2000 {
            classes[0].push(user);
        } else if user.rating >= 1600 {
            classes[1].push(user);
        } else if user.rating >= 1200 {
            classes[2].push(user);
        } else {
            classes[3].push(user);
        }
    }

    let mut result = BTreeMap::new();
    for i in 0..4 {
        let nodes = if i == 0 {
            construct_2nd_class_a_tournaments(&mut classes[i])
        } else {
            construct_normal_tournaments(&mut classes[i])
        };
        for (j, node) in nodes.into_iter().enumerate() {
            let class_name = format!("{}{}", CLASS_KEY[i], j + 1);
            result.insert(class_name, Response { node });
        }
    }

    write("./public/bracket-2.json", serde_json::to_string(&result)?)?;
    Ok(())
}

fn construct_2nd_class_a_tournaments<'a>(users: &mut Vec<&'a User>) -> Vec<Node<'a>> {
    users.sort();
    users.reverse();
    const NEXT_A1: [&str; 14] = [
        // 1st A top 16
        "kort0n",
        "leaf1415",
        "fuppy0716",
        "snuke",
        "Rubikun",
        "dreamoon",
        "mikit",
        "uwi",
        "Kiri8128",
        "heno239",
        "cuthbert",
        "tempura0224",
        "LayCurse",
        "climpet",
    ];
    const NEXT_A2: [&str; 4] = [
        // 1st B1 top 4
        "carrot46",
        "morio__",
        "idsigma",
        "mugen1337",
    ];
    let mut a = vec![vec![]; 3];
    for user_id in NEXT_A1.iter() {
        if let Some(index) = users
            .iter()
            .position(|user| user.user_id.as_str() == *user_id)
        {
            let user = users.remove(index);
            a[0].push(user);
        }
    }
    while a[0].len() < 32 && !users.is_empty() {
        a[0].push(users.pop().unwrap());
    }

    for user_id in NEXT_A2.iter() {
        if let Some(index) = users
            .iter()
            .position(|user| user.user_id.as_str() == *user_id)
        {
            let user = users.remove(index);
            a[1].push(user);
        }
    }
    while a[1].len() < 32 && !users.is_empty() {
        a[1].push(users.pop().unwrap());
    }

    for i in 0..3 {
        a[i].sort();
    }

    vec![
        construct_tournament(&a[0], 0),
        construct_tournament(&a[1], 0),
        construct_tournament(users, 0),
    ]
}

fn construct_normal_tournaments<'a>(users: &mut Vec<&'a User>) -> Vec<Node<'a>> {
    let class_limit = users.len() / 6 * 2;
    users.sort();
    vec![
        construct_tournament(&users[..class_limit], 0),
        construct_tournament(&users[class_limit..(2 * class_limit)], 0),
        construct_tournament(&users[(2 * class_limit)..], 0),
    ]
}

fn construct_tournament<'a>(sorted_users: &[&'a User], depth: usize) -> Node<'a> {
    if sorted_users.len() == 1 {
        Node {
            user: Some(sorted_users[0]),
            rank: None,
            children: vec![],
        }
    } else if depth == 4 {
        let children = sorted_users
            .iter()
            .map(|user| Node {
                user: Some(*user),
                rank: None,
                children: vec![],
            })
            .collect::<Vec<_>>();
        Node {
            user: None,
            rank: None,
            children,
        }
    } else {
        let mut left = vec![];
        let mut right = vec![];
        for (i, user) in sorted_users.iter().enumerate() {
            if i % 4 == 0 || i % 4 == 3 {
                left.push(*user);
            } else {
                right.push(*user);
            }
        }
        Node {
            user: None,
            rank: None,
            children: vec![
                construct_tournament(&left, depth + 1),
                construct_tournament(&right, depth + 1),
            ],
        }
    }
}
