use crate::common::construct_season_3::construct_whole_tournament;
use crate::resolver::AggregatedUserRank;
use crate::{
    construct_league, load_previous_ranking, load_season_user_list, load_standings, pick_top4,
    resolve_one_round, Response,
};
use anyhow::Result;
use std::collections::BTreeMap;
use std::fs::write;

pub fn generate_bracket_file<T: AggregatedUserRank + Clone + Ord + Default>(
    season_id: u32,
    defending_champion: &str,
    sort_a3_by_previous_rank: bool,
    contest_results: &[(&str, Vec<&str>)],
) -> Result<()> {
    assert!(season_id > 0);
    let previous_ranks = load_previous_ranking(&(season_id - 1).to_string())?;
    let users = load_season_user_list(season_id)?;
    let primitive_response_map = construct_whole_tournament(
        users,
        previous_ranks,
        defending_champion.to_string(),
        sort_a3_by_previous_rank,
    );
    let results = contest_results
        .iter()
        .map(|(filename, writers)| {
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
        let mut user_rank_sum: BTreeMap<_, T> = BTreeMap::new();

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
        format!("./public/bracket-{}.json", season_id),
        serde_json::to_string_pretty(&response_map)?,
    )?;
    Ok(())
}
