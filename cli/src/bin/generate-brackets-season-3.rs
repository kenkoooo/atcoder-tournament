use anyhow::Result;
use cli::common::construct_season_3::construct_season_3_tournament;
use cli::{
    construct_league, load_previous_ranking, load_season_user_list, load_standings, pick_top4,
    resolve_one_round, Response,
};
use std::collections::BTreeMap;
use std::fs::write;

fn main() -> Result<()> {
    let previous_ranks = load_previous_ranking("2")?;
    let users = load_season_user_list(3)?;
    let primitive_response_map = construct_season_3_tournament(users, previous_ranks);

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
        assert!(league.is_empty());
        assert!(top4.is_none());

        let mut losers = vec![];
        let mut users_result = BTreeMap::new();
        let mut user_rank_sum = BTreeMap::new();
        for (filename, writers) in vec![(
            "./data/season-2/abc184.json",
            vec!["beet", "evima", "kyopro_friends", "tatyam", "sheyasutaka"],
        )] {
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

        let league = construct_league(&losers, &users_result, &user_rank_sum);
        let top4 = pick_top4(&node, &league);
        response_map.insert(
            class_id,
            Response {
                node,
                league,
                defending_champion,
                promotion_rank,
                drop_rank,
                top4,
            },
        );
    }

    write(
        "./public/bracket-3.json",
        serde_json::to_string(&response_map)?,
    )?;

    Ok(())
}
