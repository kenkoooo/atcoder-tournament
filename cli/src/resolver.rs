use crate::{BattleResult, BattleResultDetail, Node, User};
use rand::prelude::*;
use std::cmp::Reverse;
use std::collections::BTreeMap;

type UserId = String;
type UserPair<'a> = (&'a User, &'a User);

pub fn resolve_one_round<'a>(
    standings: &BTreeMap<UserId, i64>,
    league_users: &mut Vec<&'a User>,
    users_result: &mut BTreeMap<UserId, Vec<BattleResultDetail<'a>>>,
    node: &mut Node<'a>,
    user_rank_sum: &mut BTreeMap<UserId, i64>,
    writers: &[&str],
) {
    // resolve league results
    for user in league_users.iter() {
        let results = users_result.get_mut(&user.user_id).unwrap();
        let last = results.last_mut().unwrap();
        if let BattleResult::NotYet = last.result {
            let opponent = last.opponent.unwrap();
            let opponent_rank = standings.get(&opponent.user_id).cloned();
            let my_rank = standings.get(&user.user_id).cloned();
            last.result = user.resolve_league_match_result(opponent, my_rank, opponent_rank);
        } else {
            unreachable!("{:?}", results);
        }
    }
    // resolve tournament results
    node.resolve_tournament_result(standings, users_result, league_users);
    let mut finished = false;
    if users_result.len() == league_users.len() + 1 {
        league_users.pop().unwrap();
        finished = true;
    }

    // resolve writer results
    for (user_id, result) in users_result.iter_mut() {
        if writers.contains(&user_id.as_str()) {
            let last = result.last_mut().unwrap();
            match last.result {
                BattleResult::SkipLose => {
                    last.result = BattleResult::Writer;
                }
                _ => unreachable!(),
            }
        }
    }

    // update rank sum
    for (user_id, user_result) in users_result.iter() {
        let cur_sum = user_rank_sum.entry(user_id.clone()).or_insert(0);
        match user_result.last().unwrap().result {
            BattleResult::Win { rank } | BattleResult::Lose { rank } => {
                *cur_sum += rank;
            }
            BattleResult::SkipLose | BattleResult::SkipWin => {
                *cur_sum += standings.len() as i64 + 1;
            }
            BattleResult::Writer | BattleResult::NotYet => {}
        }
    }

    // next league matches
    if !finished {
        let (matches, odd) = get_league_matches(users_result, user_rank_sum, league_users);
        for (user_a, user_b) in matches {
            users_result
                .get_mut(&user_a.user_id)
                .unwrap()
                .push(BattleResultDetail {
                    opponent: Some(user_b),
                    result: BattleResult::NotYet,
                });
            users_result
                .get_mut(&user_b.user_id)
                .unwrap()
                .push(BattleResultDetail {
                    opponent: Some(user_a),
                    result: BattleResult::NotYet,
                });
        }
        if let Some((last, prev)) = odd {
            users_result
                .get_mut(&last.user_id)
                .unwrap()
                .push(BattleResultDetail {
                    opponent: Some(prev),
                    result: BattleResult::NotYet,
                });
        }
    }
}
pub fn count_wins(results: &[BattleResultDetail]) -> i64 {
    let mut win_count = 0;
    for result in results.iter() {
        match result.result {
            BattleResult::Win { .. } | BattleResult::SkipWin => {
                win_count += 1;
            }
            _ => {}
        }
    }
    win_count
}

fn is_matched_before(
    user_a: &User,
    user_b: &User,
    users_result: &BTreeMap<UserId, Vec<BattleResultDetail>>,
) -> bool {
    users_result[&user_a.user_id]
        .iter()
        .any(|r| r.opponent == Some(user_b))
}

pub fn get_league_matches<'a>(
    users_result: &BTreeMap<UserId, Vec<BattleResultDetail<'a>>>,
    user_rank_sum: &BTreeMap<UserId, i64>,
    league_users: &[&'a User],
) -> (Vec<UserPair<'a>>, Option<UserPair<'a>>) {
    let n = league_users.len();
    assert!(n >= 2);

    let mut league_users = league_users
        .iter()
        .map(|loser| {
            let results = &users_result[&loser.user_id];
            let win_count = count_wins(results);
            (*loser, win_count, user_rank_sum[&loser.user_id])
        })
        .collect::<Vec<_>>();
    league_users.sort_by_key(|&(user, win, rank)| {
        (
            Reverse(win),
            rank,
            Reverse(user.rating),
            Reverse(user.user_id.as_str()),
        )
    });

    let mut result = vec![];
    let mut i = 0;
    while i * 2 + 1 < n {
        let cur_win_count = league_users[i * 2].1;
        let mut same_win_users = vec![];
        while i * 2 + 1 < n && league_users[i * 2].1 == cur_win_count {
            same_win_users.push(league_users[i * 2].0);
            same_win_users.push(league_users[i * 2 + 1].0);
            i += 1;
        }

        let pairs = same_win_users.len() / 2;
        let mut rng = StdRng::seed_from_u64(717);
        for _ in 0..20 {
            same_win_users.shuffle(&mut rng);
            let mut ok = true;
            for i in 0..pairs {
                let user_a = same_win_users[i];
                let user_b = same_win_users[pairs + i];
                if is_matched_before(user_a, user_b, users_result) {
                    ok = false;
                    break;
                }
            }
            if ok {
                break;
            }
        }
        for i in 0..pairs {
            let user_a = same_win_users[i];
            let user_b = same_win_users[pairs + i];
            result.push((user_a, user_b));
        }
    }

    assert!((n % 2 == 0 && n == i * 2) || (n % 2 == 1 && n == i * 2 + 1));

    if n % 2 == 1 {
        let user_a = league_users[n - 1].0;
        let user_b = league_users[n - 2].0;
        (result, Some((user_a, user_b)))
    } else {
        (result, None)
    }
}
