use anyhow::Result;
use serde::de::DeserializeOwned;
use serde::Serialize;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

pub(crate) fn read_json<T: DeserializeOwned, P: AsRef<Path>>(path: P) -> Result<T> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let value = serde_json::from_reader(reader)?;
    Ok(value)
}

pub(crate) fn write_json<P: AsRef<Path>, T: Serialize>(path: P, value: &T) -> Result<()> {
    let file = File::create(path)?;
    serde_json::to_writer_pretty(file, value)?;
    Ok(())
}
