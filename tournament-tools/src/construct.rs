use crate::bracket::User;
use crate::types::{ClassId, UserId};
use crate::{Bracket, Rank};
use std::collections::{BTreeMap, BTreeSet};

const BRACKET_SIZE: usize = 32;

fn get_user_map(registered_user_ids: Vec<UserId>, ratings: Vec<User>) -> BTreeMap<String, User> {
    let mut users = BTreeMap::new();
    for user in ratings {
        users.insert(user.user_id.to_lowercase(), user);
    }

    let mut registered_users = BTreeMap::new();
    for user_id in registered_user_ids {
        if let Some(user) = users.remove(&user_id.to_lowercase()) {
            registered_users.insert(user.user_id.clone(), user);
        }
    }
    registered_users
}

#[derive(Default)]
pub struct ConstructConfig {
    pub ratings: Vec<User>,
    pub registered_user_ids: Vec<UserId>,
    pub previous_brackets: BTreeMap<ClassId, Bracket>,
}

/// This function is used from CLI and Wasm.
pub fn construct_tournament(config: ConstructConfig) -> BTreeMap<ClassId, Bracket> {
    let ConstructConfig {
        ratings,
        registered_user_ids,
        previous_brackets,
        ..
    } = config;
    let mut registered_users = get_user_map(registered_user_ids, ratings);
    let mut a_users = vec![];
    let mut non_a_users = vec![];
    let mut defending_champion = None;
    for (class, bracket) in previous_brackets {
        let ranking = bracket.get_user_ranking();
        assert!(!ranking.is_empty());
        if &class == "A1" {
            defending_champion = Some(ranking[0].user_id.clone());
        }

        for (rank, user) in ranking.into_iter().enumerate() {
            if let Some(user) = registered_users.remove(&user.user_id) {
                if user.rating >= 2000 {
                    a_users.push(((class.clone(), rank), user));
                } else {
                    non_a_users.push(user);
                }
            }
        }
    }

    for (_, user) in registered_users {
        if user.rating >= 2000 {
            a_users.push((("Z0".to_string(), 0), user));
        } else {
            non_a_users.push(user);
        }
    }

    a_users.sort();
    let prev_a3_bracket_count = a_users
        .iter()
        .map(|u| (u.0).0.as_str())
        .filter(|class| class.starts_with("A3"))
        .collect::<BTreeSet<_>>()
        .len();
    let prev_a3_threshold = 10 / prev_a3_bracket_count;

    // A1
    let (next_a1, a_users) = construct_single_a_class(
        a_users,
        |class, rank, user| {
            (class == "A1" && rank < 22) || (class == "A2" && rank < 10) || user.rating >= 2800
        },
        4,
        BRACKET_SIZE,
    );

    // A2
    let (next_a2, a_users) = construct_single_a_class(
        a_users,
        |class, rank, user| {
            class == "A1"
                || (class == "A2" && rank < 22)
                || (class.starts_with("A3") && rank < prev_a3_threshold)
                || user.rating >= 2400
        },
        0,
        BRACKET_SIZE,
    );

    let mut next_a3 = a_users.into_iter().map(|t| t.1).collect::<Vec<_>>();
    next_a3.sort();

    non_a_users.sort();
    let mut non_a_classes = vec![vec![]; 3];
    for user in non_a_users {
        assert!(user.rating < 2000);
        if user.rating >= 1600 {
            non_a_classes[0].push(user);
        } else if user.rating >= 1200 {
            non_a_classes[1].push(user);
        } else {
            non_a_classes[2].push(user);
        }
    }

    let non_a_classes = non_a_classes
        .into_iter()
        .map(|mut users| {
            let class_count = (users.len() / 32).min(3).max(1);
            let member_count = users.len() / class_count / 2 * 2;

            let mut classes = vec![];
            users.sort();
            for _ in 0..(class_count - 1) {
                let t = users.split_off(member_count);
                classes.push(users);
                users = t;
            }
            classes.push(users);
            classes
        })
        .collect::<Vec<_>>();

    let mut brackets = BTreeMap::new();
    if !next_a1.is_empty() {
        brackets.insert(
            "A1".to_string(),
            Bracket::create(next_a1, defending_champion.clone(), Some(23), None),
        );
    }

    if !next_a2.is_empty() {
        brackets.insert(
            "A2".to_string(),
            Bracket::create(next_a2, defending_champion.clone(), Some(23), Some(10)),
        );
    }

    if !next_a3.is_empty() {
        let a3_size = next_a3.len() / BRACKET_SIZE;
        let promotion_rank = 10 / a3_size;
        let mut next_a3s = vec![vec![]; a3_size];
        for (i, user) in next_a3.into_iter().enumerate() {
            next_a3s[i % a3_size].push(user);
        }

        for (i, next_a3) in next_a3s.into_iter().enumerate() {
            let class = if a3_size == 1 {
                "A3".to_string()
            } else {
                format!("A3-{}", i + 1)
            };
            brackets.insert(
                class,
                Bracket::create(
                    next_a3,
                    defending_champion.clone(),
                    None,
                    Some(promotion_rank),
                ),
            );
        }
    }

    for (i, classes) in non_a_classes.into_iter().enumerate() {
        let class_head = (i as u8 + b'B') as char;
        for (div, users) in classes.into_iter().enumerate() {
            let class = format!("{}{}", class_head, div + 1);
            let bracket = Bracket::create(users, None, None, None);
            brackets.insert(class, bracket);
        }
    }

    brackets
}

fn construct_single_a_class<F>(
    users_sorted_by_prev_rank: Vec<((ClassId, Rank), User)>,
    filter: F,
    use_prev_rank: usize,
    min_members: usize,
) -> (Vec<User>, Vec<((ClassId, Rank), User)>)
where
    F: Fn(&ClassId, Rank, &User) -> bool,
{
    let mut selected_users = vec![];
    let mut remaining_users = vec![];
    for ((class, rank), user) in users_sorted_by_prev_rank {
        if filter(&class, rank, &user) {
            selected_users.push(user);
        } else {
            remaining_users.push(((class, rank), user));
        }
    }

    let cur_size = selected_users.len();
    let less = (min_members.max(cur_size) - cur_size).min(remaining_users.len());
    let rest_users = remaining_users.split_off(less);
    assert_eq!(remaining_users.len(), less);
    selected_users.extend(remaining_users.into_iter().map(|t| t.1));

    if selected_users.len() >= use_prev_rank {
        selected_users[use_prev_rank..].sort();
    }
    (selected_users, rest_users)
}
