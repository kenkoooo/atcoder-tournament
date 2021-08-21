pub(crate) mod bracket;
pub(crate) mod config;
pub(crate) mod construct;
pub(crate) mod io;
pub(crate) mod league;
pub(crate) mod rating;
pub(crate) mod standings;
pub(crate) mod types;

pub use bracket::{read_brackets, write_brackets, Bracket, User};
pub use config::{Match, TournamentConfig};
pub use construct::{construct_tournament, ConstructConfig};
pub use rating::{load_rating, load_user_ids};
pub use standings::{read_standings, read_standings_from_path};
pub use types::{ClassId, Rank, SeasonId, UserId};

use crate::config::read_config;
use anyhow::Result;
use std::collections::BTreeMap;

#[cfg(feature = "league_matching")]
pub fn update_tournament(
    brackets: &mut BTreeMap<ClassId, Bracket>,
    standings_list: &[BTreeMap<UserId, Rank>],
) {
    for bracket in brackets.values_mut() {
        bracket.update_tournament_result(&standings_list);
        bracket.update_league_result(&standings_list);

        let tournament_battle_result = bracket.consolidate_tournament_battle_result();
        bracket.extend_league(&tournament_battle_result);
        bracket.refresh_league_ranking(&tournament_battle_result);

        if bracket.tournament_finished() {
            let ranking = bracket.get_user_ranking();
            assert!(!ranking.is_empty());
            let mut top4 = BTreeMap::new();
            for (rank, user) in ranking.into_iter().take(4).enumerate() {
                top4.entry(rank + 1).or_insert_with(Vec::new).push(user);
            }
            bracket.top4 = Some(top4);
        } else {
            bracket.match_new_league_games();
        }
    }
}

pub fn load_standings_list(season_id: SeasonId) -> Result<Vec<BTreeMap<UserId, Rank>>> {
    let config = read_config(season_id)?;
    let mut standings_list = vec![];
    for m in config.matches.iter() {
        let standings = read_standings(config.season, &m.standings)?;
        standings_list.push(standings);
    }
    Ok(standings_list)
}
