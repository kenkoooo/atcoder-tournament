use crate::{LeagueEntry, Node, User};
use std::collections::BTreeMap;

pub fn pick_top4<'a>(
    node: &Node<'a>,
    league: &[LeagueEntry<'a>],
) -> Option<BTreeMap<i64, Vec<&'a User>>> {
    let winner = node.user?;
    let second = node
        .children
        .iter()
        .flat_map(|node| node.user)
        .find(|user| user.user_id != winner.user_id)?;
    let third = league.get(0)?.user;
    let fourth = league.get(1)?.user;
    let mut result = BTreeMap::new();
    result.insert(1, vec![winner]);
    result.insert(2, vec![second]);
    result.insert(3, vec![third]);
    result.insert(4, vec![fourth]);
    Some(result)
}
