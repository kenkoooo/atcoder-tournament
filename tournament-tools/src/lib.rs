pub(crate) mod config;
pub(crate) mod io;
pub(crate) mod standings;
pub(crate) mod types;

pub use config::{read_config, Match, TournamentConfig};
pub use standings::read_standings;
