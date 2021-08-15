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
pub fn construct_tournament(
    registered_user_ids: String,
    ratings: String,
    previous_brackets: String,
) -> String {
    let ratings = serde_json::from_str(&ratings).unwrap();
    let registered_user_ids = serde_json::from_str(&registered_user_ids).unwrap();
    let previous_brackets = serde_json::from_str(&previous_brackets).unwrap();
    let brackets =
        tournament_tools::construct_tournament(ratings, registered_user_ids, previous_brackets);
    serde_json::to_string(&brackets).unwrap()
}
