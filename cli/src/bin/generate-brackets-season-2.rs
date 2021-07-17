use anyhow::Result;
use cli::{
    construct_league, construct_normal_tournaments, construct_tournament, divide_to_classes,
    load_season_user_list, load_standings, pick_top4, resolve_one_round, BattleResultDetail, Node,
    Response, User,
};
use std::collections::BTreeMap;
use std::fs::write;

const CLASS_KEY: [&str; 4] = ["A", "B", "C", "D"];
type UserId = String;

fn main() -> Result<()> {
    let users = load_season_user_list(2)?;
    let classes = divide_to_classes(users);

    let mut responses = BTreeMap::new();
    for (i, class) in classes.into_iter().enumerate() {
        let nodes = if i == 0 {
            construct_2nd_class_a_tournaments(class)
        } else {
            construct_normal_tournaments(class)
        };
        for (j, mut node) in nodes.into_iter().enumerate() {
            let mut losers = vec![];
            let mut users_result: BTreeMap<UserId, Vec<BattleResultDetail>> = BTreeMap::new();
            let mut user_rank_sum: BTreeMap<_, i64> = BTreeMap::new();
            for (filename, writers) in vec![
                (
                    "./data/season-2/abc184.json",
                    vec!["beet", "evima", "kyopro_friends", "tatyam", "sheyasutaka"],
                ),
                (
                    "./data/season-2/abc185.json",
                    vec![
                        "beet",
                        "gazelle",
                        "kobae964",
                        "kort0n",
                        "kyopro_friends",
                        "QCFium",
                        "satashun",
                    ],
                ),
                (
                    "./data/season-2/abc187.json",
                    vec![
                        "kort0n",
                        "Kmcode",
                        "satashun",
                        "tatyam",
                        "tempura0224",
                        "tozangezan",
                    ],
                ),
                (
                    "./data/season-2/abc188.json",
                    vec![
                        "kort0n",
                        "kyopro_friends",
                        "QCFium",
                        "tatyam",
                        "ynymxiaolongbao",
                    ],
                ),
                (
                    "./data/season-2/abc189.json",
                    vec!["kort0n", "kyopro_friends", "satashun", "tatyam"],
                ),
            ]
            .into_iter()
            {
                let standings = load_standings(filename)?;
                eprintln!("Resolving {} ...", filename);
                resolve_one_round(
                    &standings,
                    &mut losers,
                    &mut users_result,
                    &mut node,
                    &mut user_rank_sum,
                    &writers,
                );
            }

            let class_name = format!("{}{}", CLASS_KEY[i], j + 1);
            let league = construct_league(&losers, &users_result, &user_rank_sum);
            let defending_champion = if class_name.as_str() == "A1" {
                Some("heno239".to_string())
            } else {
                None
            };
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
            let top4 = pick_top4(&node, &league);
            responses.insert(
                class_name,
                Response {
                    node,
                    league: Some(league),
                    defending_champion,
                    promotion_rank,
                    drop_rank,
                    top4,
                },
            );
        }
    }

    write(
        "./public/bracket-2.json",
        serde_json::to_string(&responses)?,
    )?;
    Ok(())
}

fn construct_2nd_class_a_tournaments(mut users: Vec<User>) -> Vec<Node> {
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

    a.iter_mut().for_each(|ai| ai.sort());

    vec![
        construct_tournament(&a[0], 0),
        construct_tournament(&a[1], 0),
        construct_tournament(&users, 0),
    ]
}
