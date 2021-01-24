use crate::{LeagueEntry, Node, User};
use std::collections::BTreeMap;

pub fn pick_top4(node: &Node, league: &[LeagueEntry]) -> Option<BTreeMap<i64, Vec<User>>> {
    let winner = node.user.clone()?;
    let second = node
        .children
        .iter()
        .flat_map(|node| node.user.as_ref())
        .find(|user| user.user_id != winner.user_id)
        .cloned()?;
    let third = league.get(0)?.user.clone();
    let fourth = league.get(1)?.user.clone();
    let mut result = BTreeMap::new();
    result.insert(1, vec![winner]);
    result.insert(2, vec![second]);
    result.insert(3, vec![third]);
    result.insert(4, vec![fourth]);
    Some(result)
}
