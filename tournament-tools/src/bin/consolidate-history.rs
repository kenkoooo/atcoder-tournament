use anyhow::Result;
use serde::Serialize;
use std::cmp::Ordering;
use std::collections::BTreeMap;
use std::fs::write;
use tournament_tools::{read_brackets, ClassId, Rank, UserId};

fn main() -> Result<()> {
    let mut user_histories = BTreeMap::new();
    for season_id in 1..=5 {
        let brackets = read_brackets(season_id)?;
        for (class, bracket) in brackets {
            let user_top_k = bracket.user_top_k();
            for (user_id, top_k) in user_top_k {
                user_histories
                    .entry(user_id)
                    .or_insert_with(BTreeMap::new)
                    .insert(
                        season_id,
                        UserTournamentHistory {
                            class: class.clone(),
                            top_k,
                            final_rank: None,
                        },
                    );
            }

            let ranking = bracket.get_user_ranking();
            for (rank, user) in ranking.into_iter().skip(2).enumerate() {
                if let Some(history) = user_histories
                    .get_mut(&user.user_id)
                    .and_then(|map| map.get_mut(&season_id))
                {
                    history.final_rank = Some(rank + 3);
                }
            }
        }
    }

    let mut tournament_histories = vec![];
    for season_id in 1..=5 {
        let brackets = read_brackets(season_id)?;
        let mut entries = vec![];
        let mut expandable = true;
        for (class, bracket) in brackets {
            let ranking = bracket.get_user_ranking();
            if ranking.len() <= 2 {
                expandable = false;
                for (user_id, rank) in bracket.user_top_k() {
                    entries.push(RankingEntry {
                        class: class.to_string(),
                        user_id,
                        rank,
                    });
                }
            } else {
                for (rank, user) in ranking.into_iter().enumerate() {
                    entries.push(RankingEntry {
                        class: class.to_string(),
                        user_id: user.user_id,
                        rank: rank + 1,
                    });
                }
            }
        }

        entries.sort();
        if !expandable {
            entries.truncate(4);
        }
        tournament_histories.push(TournamentHistory {
            season: season_id.to_string(),
            ranking: entries.into_iter().enumerate().collect(),
            expandable,
        });
    }
    write(
        "./public/tournaments.json",
        serde_json::to_string(&tournament_histories)?,
    )?;

    let user_histories = user_histories
        .into_iter()
        .map(|(user_id, histories)| UserHistory {
            user_id,
            histories: histories
                .into_iter()
                .map(|(season, history)| (season.to_string(), history))
                .collect(),
        })
        .collect::<Vec<_>>();

    write(
        "./public/histories.json",
        serde_json::to_string(&user_histories)?,
    )?;
    Ok(())
}

#[derive(Serialize)]
struct TournamentHistory {
    season: String,
    ranking: Vec<(Rank, RankingEntry)>,
    expandable: bool,
}
#[derive(Serialize, Eq, PartialEq)]
struct RankingEntry {
    class: ClassId,
    user_id: UserId,
    rank: Rank,
}

impl Ord for RankingEntry {
    fn cmp(&self, other: &Self) -> Ordering {
        self.class
            .cmp(&other.class)
            .then(self.rank.cmp(&other.rank))
    }
}
impl PartialOrd for RankingEntry {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(&other))
    }
}

#[derive(Serialize)]
struct UserHistory {
    user_id: UserId,
    histories: BTreeMap<UserId, UserTournamentHistory>,
}

#[derive(Serialize)]
struct UserTournamentHistory {
    class: ClassId,
    top_k: Rank,
    final_rank: Option<Rank>,
}
