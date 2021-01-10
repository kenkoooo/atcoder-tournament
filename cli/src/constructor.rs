use crate::{Node, User};

pub fn construct_tournament<'a>(sorted_users: &[&'a User], depth: usize) -> Node<'a> {
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
