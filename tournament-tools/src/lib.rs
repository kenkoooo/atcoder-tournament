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
pub use construct::construct_tournament;
pub use rating::{load_rating, load_user_ids};
pub use standings::{read_standings, read_standings_from_path};

use crate::config::read_config;
use crate::types::{ClassId, Rank, SeasonId, UserId};
use anyhow::Result;
use std::collections::BTreeMap;

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
        bracket.match_new_league_games();
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
