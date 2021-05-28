use anyhow::Result;
use cli::{read_from_file, Node, Response};
use serde::Serialize;
use std::collections::BTreeMap;
use std::fs::write;

fn main() -> Result<()> {
    let mut user_histories = BTreeMap::new();
    for season in 1..=3 {
        let filepath = format!("./public/bracket-{}.json", season);
        let responses: BTreeMap<String, Response> = read_from_file(filepath)?;
        for (class, response) in responses {
            let node = response.node;
            let mut user_top_k = BTreeMap::new();
            traverse(node, &mut user_top_k, 1);

            for (user_id, top_k) in user_top_k {
                let cur = user_histories.entry(user_id).or_insert_with(BTreeMap::new);
                cur.insert(
                    season,
                    UserTournamentHistory {
                        class: class.clone(),
                        top_k,
                        final_rank: None,
                    },
                );
            }

            let league = response.league.unwrap_or_else(Vec::new);
            for entry in league {
                let user_id = entry.user.user_id;
                let final_rank = entry.provisional_rank;
                if let Some(history) = user_histories
                    .get_mut(&user_id)
                    .and_then(|map| map.get_mut(&season))
                {
                    history.final_rank = Some(final_rank);
                }
            }
        }
    }

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

fn traverse(node: Node, user_top_k: &mut BTreeMap<String, i64>, top_k: i64) {
    if let Some(user_id) = node.user.as_ref().map(|user| user.user_id.clone()) {
        let cur = user_top_k.entry(user_id).or_insert(top_k);
        *cur = top_k.min(*cur);
    }
    for node in node.children {
        traverse(node, user_top_k, top_k * 2);
    }
}

#[derive(Serialize)]
struct UserHistory {
    user_id: String,
    histories: BTreeMap<String, UserTournamentHistory>,
}

#[derive(Serialize)]
struct UserTournamentHistory {
    class: String,
    top_k: i64,
    final_rank: Option<u32>,
}
