mod utils;

use cli::common::RatingStorage;
use cli::{parse_previous_ranking, User};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

}
#[wasm_bindgen]
pub fn construct_tournament(users: String, previous_ranking: String, ratings: String) -> String {
    let previous_ranking = parse_previous_ranking(&previous_ranking).unwrap();
    let ratings: Vec<User> = serde_json::from_str(&ratings).unwrap();
    let rating_storage = RatingStorage::new(&ratings);
    let users: Vec<String> = serde_json::from_str(&users).unwrap();
    let users = users
        .into_iter()
        .flat_map(|user_id| rating_storage.get_rating(&user_id))
        .collect::<Vec<_>>();
    let responses =
        cli::common::construct_season_3::construct_season_3_tournament(users, previous_ranking);
    serde_json::to_string(&responses).unwrap()
}
