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
    set_panic_hook();
    let ratings = serde_json::from_str(&ratings).unwrap();
    let registered_user_ids = serde_json::from_str(&registered_user_ids).unwrap();
    let previous_brackets = serde_json::from_str(&previous_brackets).unwrap();
    let config = tournament_tools::ConstructConfig {
        ratings,
        registered_user_ids,
        previous_brackets,
        ..Default::default()
    };
    let brackets = tournament_tools::construct_tournament(config);
    serde_json::to_string(&brackets).unwrap()
}

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
