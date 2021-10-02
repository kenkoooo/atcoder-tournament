use anyhow::Result;
use std::collections::BTreeMap;
use std::env;
use tournament_tools::{read_brackets, BracketNode, UserId, UserLeagueEntry};

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let season_id: u32 = args[1].parse()?;

    let brackets = read_brackets(season_id)?;

    for (class_id, bracket) in brackets {
        println!("{}", class_id);

        println!("tournament:");
        let mut next_tournament_battles = vec![];
        show_next_tournament_battle(&bracket.node, &mut next_tournament_battles);
        for battle in next_tournament_battles {
            println!("{}", battle.join("  VS  "));
        }

        println!("league:");
        let next_league_battles = show_next_league_battle(&bracket.league);
        for ((_, user1), (_, user2)) in next_league_battles {
            println!("{}  VS  {}", user1, user2);
        }
    }

    Ok(())
}

fn show_next_tournament_battle(node: &BracketNode, result: &mut Vec<Vec<UserId>>) {
    let children_filled = node.children.iter().all(|child| child.user.is_some());
    if children_filled {
        let children = node
            .children
            .iter()
            .flat_map(|child| child.user.as_ref())
            .map(|child| child.user_id.clone())
            .collect();
        result.push(children);
    } else {
        for child in node.children.iter() {
            show_next_tournament_battle(child, result);
        }
    }
}

fn show_next_league_battle(league: &[UserLeagueEntry]) -> Vec<((usize, UserId), (usize, UserId))> {
    let max_win_count = league
        .iter()
        .map(|e| e.win_count)
        .max()
        .expect("League is empty.");
    let provisional_ranks = league
        .iter()
        .map(|e| (e.user.user_id.clone(), e.provisional_rank))
        .collect::<BTreeMap<_, _>>();

    let mut next_battles = vec![];
    for entry in league {
        if entry.win_count != max_win_count {
            continue;
        }
        let next_user_id = entry.results[entry.results.len() - 1]
            .opponent
            .user_id
            .clone();
        let &next_rank = provisional_ranks
            .get(&next_user_id)
            .expect("Opponent not found.");
        if entry.provisional_rank > next_rank {
            continue;
        }

        next_battles.push((
            (entry.provisional_rank, entry.user.user_id.clone()),
            (next_rank, next_user_id),
        ))
    }
    next_battles
}
