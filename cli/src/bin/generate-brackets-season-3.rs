use anyhow::Result;
use cli::{
    construct_normal_tournaments, construct_tournament, divide_to_classes, load_previous_ranking,
    load_season_user_list, Response, User,
};
use std::collections::BTreeMap;
use std::fs::write;

fn main() -> Result<()> {
    let previous_ranks = load_previous_ranking("2")?;
    let users = load_season_user_list(3)?;
    let classes = divide_to_classes(users);

    let mut response_map = BTreeMap::new();
    for (i, class) in classes.into_iter().enumerate() {
        let class_head = ('A' as u8 + i as u8) as char;
        if i == 0 {
            let sorted_users = construct_class_a(class, &previous_ranks);
            for (i, sorted_users) in sorted_users.into_iter().enumerate() {
                let class_name = format!("{}{}", class_head, i + 1);
                let promotion_rank = match class_name.as_str() {
                    "A2" => Some(10),
                    "A3" => Some(16),
                    _ => None,
                };
                let drop_rank = match class_name.as_str() {
                    "A1" => Some(17),
                    "A2" => Some(23),
                    _ => None,
                };

                let node = construct_tournament(&sorted_users, 0);
                response_map.insert(
                    class_name,
                    Response {
                        node,
                        league: vec![],
                        defending_champion: Some("heno239".to_string()),
                        drop_rank,
                        promotion_rank,
                        top4: None,
                    },
                );
            }
        } else {
            for (i, node) in construct_normal_tournaments(class).into_iter().enumerate() {
                let class_name = format!("{}{}", class_head, i + 1);
                response_map.insert(
                    class_name,
                    Response {
                        node,
                        league: vec![],
                        defending_champion: None,
                        drop_rank: None,
                        promotion_rank: None,
                        top4: None,
                    },
                );
            }
        }
    }

    write(
        "./public/bracket-3.json",
        serde_json::to_string(&response_map)?,
    )?;

    Ok(())
}

fn construct_class_a(
    users: Vec<User>,
    prev_ranks: &BTreeMap<String, BTreeMap<String, u32>>,
) -> Vec<Vec<User>> {
    const INF: u32 = 1 << 30;
    let mut prev_classes = vec![vec![]; 3];
    for user in users {
        if let Some(&prev_rank) = prev_ranks["A1"].get(&user.user_id) {
            prev_classes[0].push((prev_rank, user));
        } else if let Some(&prev_rank) = prev_ranks["A2"].get(&user.user_id) {
            prev_classes[1].push((prev_rank, user));
        } else if let Some(&prev_rank) = prev_ranks["A3"].get(&user.user_id) {
            prev_classes[2].push((prev_rank, user));
        } else {
            prev_classes[2].push((INF, user));
        }
    }

    prev_classes.iter_mut().for_each(|users| users.sort());
    let mut prev_classes = prev_classes
        .into_iter()
        .map(|v| v.into_iter())
        .collect::<Vec<_>>();

    let mut next_classes = vec![vec![]; 3];

    // A1
    next_classes[0].extend(prev_classes.take(0, 16).into_iter().map(|e| e.1));
    next_classes[0].extend(prev_classes.take(1, 10).into_iter().map(|e| e.1));
    next_classes[0].extend(prev_classes.take(2, 6).into_iter().map(|e| e.1));
    while next_classes[0].len() < 32 {
        if let Some((_, user)) = prev_classes.take_from_up() {
            next_classes[0].push(user);
        } else {
            break;
        }
    }

    // A2
    next_classes[1].extend(prev_classes.take(0, 10).into_iter().map(|e| e.1));
    next_classes[1].extend(prev_classes.take(1, 12).into_iter().map(|e| e.1));
    next_classes[1].extend(prev_classes.take(2, 10).into_iter().map(|e| e.1));
    while next_classes[1].len() < 32 {
        if let Some((_, user)) = prev_classes.take_from_up() {
            next_classes[1].push(user);
        } else {
            break;
        }
    }

    for iter in prev_classes.into_iter() {
        next_classes[2].extend(iter.map(|e| e.1));
    }
    next_classes
}

trait IterVecOp<T> {
    fn take(&mut self, i: usize, x: usize) -> Vec<T>;
    fn take_from_up(&mut self) -> Option<T>;
}

impl<T, I> IterVecOp<T> for Vec<I>
where
    I: Iterator<Item = T>,
{
    fn take(&mut self, i: usize, x: usize) -> Vec<T> {
        (0..x).flat_map(|_| self[i].next()).collect()
    }
    fn take_from_up(&mut self) -> Option<T> {
        for v in self.iter_mut() {
            let e = v.next();
            if e.is_some() {
                return e;
            }
        }
        None
    }
}
