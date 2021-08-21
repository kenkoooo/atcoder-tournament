use crate::bracket::User;
use crate::types::{ClassId, UserId};
use crate::Bracket;
use std::collections::BTreeMap;

#[derive(Default)]
pub struct ConstructConfig {
    pub ratings: Vec<User>,
    pub registered_user_ids: Vec<UserId>,
    pub previous_brackets: BTreeMap<ClassId, Bracket>,
}

pub fn construct_tournament(config: ConstructConfig) -> BTreeMap<ClassId, Bracket> {
    let ConstructConfig {
        ratings,
        registered_user_ids,
        previous_brackets,
        ..
    } = config;
    let mut users = ratings.into_iter().fold(BTreeMap::new(), |mut map, user| {
        map.insert(user.user_id.clone(), user);
        map
    });
    let mut registered_users = BTreeMap::new();
    for user_id in registered_user_ids {
        if let Some(user) = users.remove(&user_id) {
            registered_users.insert(user.user_id.clone(), user);
        }
    }

    let mut previous_map = BTreeMap::new();
    let mut defending_champion = None;
    for (class, bracket) in previous_brackets {
        let ranking = bracket.get_user_ranking();
        assert!(!ranking.is_empty());
        if &class == "A1" {
            defending_champion = Some(ranking[0].user_id.clone());
        }
        let ranking = ranking
            .into_iter()
            .flat_map(|user| registered_users.remove(&user.user_id))
            .collect::<Vec<_>>();

        previous_map.insert(class, ranking);
    }

    let mut previous_a_users = vec![
        previous_map.remove("A1").unwrap_or_else(Vec::new),
        previous_map.remove("A2").unwrap_or_else(Vec::new),
        previous_map.remove("A3").unwrap_or_else(Vec::new),
    ];

    let mut new_a_users = vec![];
    let mut non_a_users = vec![];
    for (_, user) in registered_users {
        if user.rating >= 2000 {
            new_a_users.push(user);
        } else {
            non_a_users.push(user);
        }
    }
    for user in previous_map
        .into_iter()
        .flat_map(|(_, users)| users.into_iter())
    {
        if user.rating >= 2000 {
            new_a_users.push(user);
        } else {
            non_a_users.push(user);
        }
    }

    new_a_users.sort();
    previous_a_users[2].extend(new_a_users);

    let mut next_a_users = vec![vec![]; 3];
    for (i, &count) in [16, 10, 6].iter().enumerate() {
        next_a_users[0].extend(previous_a_users[i].take(count));
    }
    for previous_a_users in previous_a_users.iter_mut() {
        let less = 32 - next_a_users[0].len();
        next_a_users[0].extend(previous_a_users.take(less));
    }

    for (i, &count) in [10, 12, 10].iter().enumerate() {
        next_a_users[1].extend(previous_a_users[i].take(count));
    }
    for previous_a_users in previous_a_users.iter_mut() {
        let less = 32 - next_a_users[1].len();
        next_a_users[1].extend(previous_a_users.take(less));
    }
    for previous_a_users in previous_a_users {
        next_a_users[2].extend(previous_a_users);
    }
    next_a_users[2].sort();

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
                classes.push(users.take(member_count));
            }
            classes.push(users);
            classes
        })
        .collect::<Vec<_>>();

    let mut brackets = BTreeMap::new();
    for (i, next_a_users) in next_a_users.into_iter().enumerate() {
        if next_a_users.is_empty() {
            continue;
        }
        let class = format!("A{}", i + 1);

        let (promotion_rank, drop_rank) = match i {
            0 => (None, Some(17)),
            1 => (Some(10), Some(23)),
            2 => (Some(16), None),
            _ => unreachable!(),
        };

        let bracket = Bracket::create(
            next_a_users,
            defending_champion.clone(),
            drop_rank,
            promotion_rank,
        );
        brackets.insert(class, bracket);
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

trait Take<T> {
    fn take(&mut self, max_size: usize) -> Vec<T>;
}

impl<T> Take<T> for Vec<T> {
    fn take(&mut self, max_size: usize) -> Vec<T> {
        if self.len() >= max_size {
            let mut suffix = self.split_off(max_size);
            std::mem::swap(&mut suffix, self);
            assert_eq!(suffix.len(), max_size);
            suffix
        } else {
            self.split_off(0)
        }
    }
}
