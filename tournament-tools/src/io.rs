use crate::types::{SeasonId, TournamentConfig};
use anyhow::Result;
use serde::de::DeserializeOwned;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

pub(crate) fn read_json<T: DeserializeOwned, P: AsRef<Path>>(path: P) -> Result<T> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    serde_json::from_reader(reader)?
}
