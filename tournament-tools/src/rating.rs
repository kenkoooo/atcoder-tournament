use crate::bracket::User;
use crate::io::read_json;
use crate::types::{SeasonId, UserId};
use anyhow::Result;

pub fn load_rating(season_id: SeasonId) -> Result<Vec<User>> {
    let path = format!(
        "./data/season-{season_id}/ratings-{season_id}.json",
        season_id = season_id
    );
    read_json(path)
}

pub fn load_user_ids(season_id: SeasonId) -> Result<Vec<UserId>> {
    let path = format!(
        "./data/season-{season_id}/users-{season_id}.json",
        season_id = season_id
    );
    read_json(path)
}
