use anyhow::Result;
use cli::common::construct_season_3::construct_season_3_tournament;
use cli::{
    construct_league, load_previous_ranking, load_season_user_list, load_standings, pick_top4,
    resolve_one_round, Response,
};
use std::collections::BTreeMap;
use std::fs::write;

fn main() -> Result<()> {
    let previous_ranks = load_previous_ranking("3")?;
    let users = load_season_user_list(4)?;
    let primitive_response_map =
        construct_season_3_tournament(users, previous_ranks, "Tiramister".to_string());

    let results = vec![
        ("./data/season-4/abc204.json", vec!["kyopro_friends"]),
        (
            "./data/season-4/abc205.json",
            vec![
                "chokudai",
                "kyopro_friends",
                "KoD",
                "tozangezan",
                "penguinman",
                "tatyam",
            ],
        ),
        (
            "./data/season-4/abc207.json",
            vec!["penguinman", "ynymxiaolongbao"],
        ),
        ("./data/season-4/abc208.json", vec!["Nyaan", "KoD"]),
        (
            "./data/season-4/abc209.json",
            vec!["blackyuki", "penguinman"],
        ),
    ]
    .into_iter()
    .map(|(filename, writers): (&str, Vec<&str>)| {
        let standings = load_standings(filename)?;
        Ok((standings, writers, filename))
    })
    .collect::<Result<Vec<_>>>()?;

    let mut response_map = BTreeMap::new();
    for (class_id, response) in primitive_response_map {
        let Response {
            mut node,
            league,
            defending_champion,
            drop_rank,
            promotion_rank,
            top4,
        } = response;
        let league = league.unwrap_or_else(Vec::new);
        assert!(league.is_empty());
        assert!(top4.is_none());

        let mut losers = vec![];
        let mut users_result = BTreeMap::new();
        let mut user_rank_sum = BTreeMap::new();

        for (standings, writers, filename) in results.iter() {
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

        let league = construct_league(&losers, &users_result, &user_rank_sum);
        let top4 = pick_top4(&node, &league);
        response_map.insert(
            class_id,
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

    write(
        "./public/bracket-4.json",
        serde_json::to_string(&response_map)?,
    )?;

    Ok(())
}
