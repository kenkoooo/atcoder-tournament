use rand::distributions::Alphanumeric;
use rand::prelude::*;
use std::time::{SystemTime, UNIX_EPOCH};

pub mod api;
pub(crate) mod auth;
pub(crate) mod db;
pub(crate) mod scraping;

pub(crate) fn generate_random_string(length: usize) -> String {
    thread_rng()
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect::<String>()
}

pub(crate) fn now_secs() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("failed to get system time")
        .as_secs() as i64
}
