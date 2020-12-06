use anyhow::Result;
use cli::{
    load_season_user_list, load_standings, BattleResult, BattleResultDetail, LeagueEntry, Node,
    Response, User,
};
use rand::prelude::*;
use rand::seq::SliceRandom;
use std::cmp::Reverse;
use std::collections::BTreeMap;
use std::fs::write;

const CLASS_KEY: [&str; 4] = ["A", "B", "C", "D"];
type UserId = String;

fn count_wins(results: &[BattleResultDetail]) -> i64 {
    let mut win_count = 0;
    for result in results.iter() {
        match result.result {
            BattleResult::Win { .. } | BattleResult::SkipWin => {
                win_count += 1;
            }
            _ => {}
        }
    }
    win_count
}

fn get_league_matches<'a>(
    users_result: &BTreeMap<UserId, Vec<BattleResultDetail<'a>>>,
    user_rank_sum: &BTreeMap<UserId, i64>,
    league_users: &[&'a User],
) -> Vec<(&'a User, &'a User)> {
    let n = league_users.len();
    assert!(n >= 2);

    let mut league_users = league_users
        .iter()
        .map(|loser| {
            let results = &users_result[&loser.user_id];
            let win_count = count_wins(results);
            (*loser, win_count, user_rank_sum[&loser.user_id])
        })
        .collect::<Vec<_>>();
    league_users.sort_by_key(|&(user, win, rank)| {
        (
            Reverse(win),
            rank,
            Reverse(user.rating),
            Reverse(user.user_id.as_str()),
        )
    });

    let mut result = vec![];
    let mut i = 0;
    while i * 2 + 1 < n {
        let cur_win_count = league_users[i * 2].1;
        let mut same_win_users = vec![];
        while i * 2 + 1 < n && league_users[i * 2].1 == cur_win_count {
            same_win_users.push(league_users[i * 2].0);
            same_win_users.push(league_users[i * 2 + 1].0);
            i += 1;
        }

        let mut rng = StdRng::seed_from_u64(717);
        same_win_users.shuffle(&mut rng);
        let pairs = same_win_users.len() / 2;
        for i in 0..pairs {
            let user_a = same_win_users[i];
            let user_b = same_win_users[pairs + i];
            result.push((user_a, user_b));
        }
    }

    assert!((n % 2 == 0 && n == i * 2) || (n % 2 == 1 && n == i * 2 + 1));

    if n % 2 == 1 {
        let user_a = league_users[n - 1].0;
        let user_b = league_users[n - 2].0;
        result.push((user_a, user_b));
    }
    result
}

fn resolve_one_round<'a>(
    standings: &BTreeMap<UserId, i64>,
    losers: &mut Vec<&'a User>,
    users_result: &mut BTreeMap<UserId, Vec<BattleResultDetail<'a>>>,
    node: &mut Node<'a>,
    user_rank_sum: &mut BTreeMap<UserId, i64>,
    writers: &[&str],
) {
    // resolve league results
    for loser in losers.iter() {
        let results = users_result.get_mut(&loser.user_id).unwrap();
        let last = results.last_mut().unwrap();
        if let BattleResult::NotYet = last.result {
            let opponent = last.opponent.unwrap();
            let opponent_rank = standings.get(&opponent.user_id).cloned();
            let my_rank = standings.get(&loser.user_id).cloned();
            last.result = loser.resolve_result(opponent, my_rank, opponent_rank);
        } else {
            unreachable!("{:?}", results);
        }
    }
    // resolve tournament results
    node.resolve_tournament_result(standings, users_result, losers);

    // resolve writer results
    for (user_id, result) in users_result.iter_mut() {
        if writers.contains(&user_id.as_str()) {
            let last = result.last_mut().unwrap();
            match last.result {
                BattleResult::SkipLose => {
                    last.result = BattleResult::Writer;
                }
                _ => unreachable!(),
            }
        }
    }

    // update rank sum
    for (user_id, user_result) in users_result.iter() {
        let cur_sum = user_rank_sum.entry(user_id.clone()).or_insert(0);
        match user_result.last().unwrap().result {
            BattleResult::Win { rank } | BattleResult::Lose { rank } => {
                *cur_sum += rank;
            }
            BattleResult::SkipLose | BattleResult::SkipWin => {
                *cur_sum += standings.len() as i64 + 1;
            }
            BattleResult::Writer | BattleResult::NotYet => {}
        }
    }

    // match league
    let matches = get_league_matches(users_result, user_rank_sum, losers);
    for (user_a, user_b) in matches {
        users_result
            .get_mut(&user_a.user_id)
            .unwrap()
            .push(BattleResultDetail {
                opponent: Some(user_b),
                result: BattleResult::NotYet,
            });
        users_result
            .get_mut(&user_b.user_id)
            .unwrap()
            .push(BattleResultDetail {
                opponent: Some(user_a),
                result: BattleResult::NotYet,
            });
    }
}

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

    let mut node_map = BTreeMap::new();
    let mut losers: BTreeMap<_, Vec<&User>> = BTreeMap::new();
    let mut users_result: BTreeMap<_, Vec<BattleResultDetail>> = BTreeMap::new();

    for i in 0..4 {
        let nodes = if i == 0 {
            construct_2nd_class_a_tournaments(&mut classes[i])
        } else {
            construct_normal_tournaments(&mut classes[i])
        };
        for (j, node) in nodes.into_iter().enumerate() {
            let class_name = format!("{}{}", CLASS_KEY[i], j + 1);
            node_map.insert(class_name.clone(), node);
            losers.insert(class_name, vec![]);
        }
    }

    let mut user_rank_sum = BTreeMap::new();

    for (filename, writers) in vec![
        (
            "./data/season-2/abc184.json",
            vec!["beet", "evima", "kyopro_friends", "tatyam", "sheyasutaka"],
        ),
        // (
        //     "./data/season-2/abc184.json",
        //     vec!["beet", "evima", "kyopro_friends", "tatyam", "sheyasutaka"],
        // ),
    ]
    .into_iter()
    {
        let standings = load_standings(filename)?;
        for (class_name, node) in node_map.iter_mut() {
            let losers = losers.get_mut(class_name).unwrap();
            resolve_one_round(
                &standings,
                losers,
                &mut users_result,
                node,
                &mut user_rank_sum,
                &writers,
            );
        }
    }

    let mut responses = BTreeMap::new();
    for (class_name, node) in node_map.into_iter() {
        let losers = losers.get(&class_name).unwrap();
        let mut league = vec![];
        for loser in losers.iter() {
            let results = users_result[&loser.user_id].clone();
            let win_count = count_wins(&results);
            let rank_sum = user_rank_sum[&loser.user_id];
            league.push(LeagueEntry {
                user: *loser,
                win_count,
                rank_sum,
                results,
            });
        }
        league.sort_by_key(|entry| {
            (
                Reverse(entry.win_count),
                entry.rank_sum,
                Reverse(entry.user.rating),
            )
        });
        responses.insert(class_name, Response { node, league });
    }

    write(
        "./public/bracket-2.json",
        serde_json::to_string(&responses)?,
    )?;
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
