use crate::{Node, User};

pub fn construct_normal_tournaments(mut users: Vec<User>) -> Vec<Node> {
    let class_limit = users.len() / 6 * 2;
    users.sort();
    vec![
        construct_tournament(&users[..class_limit], 0),
        construct_tournament(&users[class_limit..(2 * class_limit)], 0),
        construct_tournament(&users[(2 * class_limit)..], 0),
    ]
}

pub fn construct_tournament(sorted_users: &[User], depth: usize) -> Node {
    if sorted_users.len() == 1 {
        Node {
            user: Some(sorted_users[0].clone()),
            rank: None,
            children: vec![],
        }
    } else if depth == 4 {
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
