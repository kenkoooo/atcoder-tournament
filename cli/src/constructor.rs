use crate::{Node, User};

const MAX_DEPTH: usize = 4;

const STATIC_MINIMUM_PARTICIPANTS: usize = 2 << MAX_DEPTH;
const FIX_SEED_NON_EXISTING_USER_PREFIX: &str = "---non-existing-user";

pub fn construct_normal_tournaments(mut users: Vec<User>) -> Vec<Node> {
    let class_limit = users.len() / 6 * 2;
    users.sort();

    let mut sorted_user_lists = vec![
        users[..class_limit].to_vec(),
        users[class_limit..(2 * class_limit)].to_vec(),
        users[(2 * class_limit)..].to_vec(),
    ];

    // fix seed
    for users in sorted_user_lists.iter_mut() {
        while users.len() < STATIC_MINIMUM_PARTICIPANTS {
            users.push(User {
                user_id: format!("{}{}", FIX_SEED_NON_EXISTING_USER_PREFIX, users.len()),
                rating: 0,
            });
        }
    }

    vec![
        construct_tournament(&sorted_user_lists[0], 0),
        construct_tournament(&sorted_user_lists[1], 0),
        construct_tournament(&sorted_user_lists[2], 0),
    ]
}

pub fn construct_tournament(sorted_users: &[User], depth: usize) -> Node {
    if sorted_users.len() == 1 {
        Node {
            user: Some(sorted_users[0].clone()),
            rank: None,
            children: vec![],
        }
    } else if depth == MAX_DEPTH {
        let children = sorted_users
            .iter()
            .map(|user| Node {
                user: Some(user.clone()),
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
                left.push(user.clone());
            } else {
                right.push(user.clone());
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

pub fn divide_to_classes(users: Vec<User>) -> Vec<Vec<User>> {
    let mut classes = vec![vec![]; 4];
    for user in users.into_iter() {
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
    classes
}
