use crate::io::{read_json, write_json};
use crate::league::{LeagueBattleResult, LeagueUtil, UserLeagueEntry};
use crate::types::{ClassId, Rank, SeasonId, UserId, INF_RANK};
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::cmp::Reverse;
use std::collections::BTreeMap;

pub fn read_brackets(season_id: SeasonId) -> Result<BTreeMap<ClassId, Bracket>> {
    let path = format!("./public/bracket-{season_id}.json", season_id = season_id);
    read_json(path)
}
pub fn write_brackets(season_id: SeasonId, brackets: &BTreeMap<ClassId, Bracket>) -> Result<()> {
    let path = format!("./public/bracket-{season_id}.json", season_id = season_id);
    write_json(path, brackets)
}

#[derive(Serialize, Deserialize)]
pub struct Bracket {
    node: BracketNode,
    league: Vec<UserLeagueEntry>,
    defending_champion: Option<UserId>,
    drop_rank: Option<usize>,
    promotion_rank: Option<usize>,
}

#[derive(Serialize, Deserialize)]
pub struct BracketNode {
    pub user: Option<User>,
    pub rank: Option<Rank>,
    pub children: Vec<BracketNode>,
}

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq)]
pub struct User {
    pub user_id: UserId,
    pub rating: u32,
}

impl Bracket {
    pub fn update_tournament_result(&mut self, result: &[BTreeMap<UserId, Rank>]) {
        let height = self.node.get_subtree_height();
        self.node.update_subtree_result(result, height - 1);
    }

    pub fn consolidate_tournament_battle_result(
        &self,
    ) -> BTreeMap<UserId, (User, Vec<LeagueBattleResult>)> {
        let mut result = BTreeMap::new();
        self.node.consolidate_tournament_result(&mut result);
        result
    }
    pub fn update_league_result(&mut self, standings: &[BTreeMap<UserId, Rank>]) {
        self.league.update_league_result(standings);
    }
    pub fn extend_league(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        self.league.extend_league(tournament_battle_result);
    }
    pub fn refresh_league_ranking(
        &mut self,
        tournament_battle_result: &BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        self.league.refresh_league_ranking(tournament_battle_result);
    }
    pub fn match_new_league_games(&mut self) {
        self.league.match_new_games();
    }
}

impl BracketNode {
    fn get_subtree_height(&self) -> usize {
        let max = self
            .children
            .iter()
            .map(|child| child.get_subtree_height())
            .max()
            .unwrap_or(0);
        max + 1
    }

    fn update_subtree_result(&mut self, result: &[BTreeMap<UserId, Rank>], pos: usize) {
        if self.rank.is_some() {
            return;
        }
        if let Some(user) = self.user.as_ref() {
            if let Some(rank) = result
                .get(pos)
                .map(|result| get_rank(result, &user.user_id))
            {
                self.rank = Some(rank);
            }
            return;
        }
        assert!(self.user.is_none());

        for child in self.children.iter_mut() {
            assert!(pos > 0);
            child.update_subtree_result(result, pos - 1);
        }
        if self.children.iter().any(|child| child.rank.is_none()) {
            return;
        }

        let winner = pick_winner(self.children.iter())
            .and_then(|child| child.user.clone())
            .expect("no winner");
        let rank = result
            .get(pos)
            .map(|result| get_rank(result, &winner.user_id));
        self.user = Some(winner);
        self.rank = rank;
    }

    fn consolidate_tournament_result(
        &self,
        result: &mut BTreeMap<UserId, (User, Vec<LeagueBattleResult>)>,
    ) {
        for child in self.children.iter() {
            child.consolidate_tournament_result(result);
        }

        let winner = match self.user.as_ref() {
            Some(winner) => winner,
            None => return,
        };
        if self.children.is_empty() {
            return;
        }
        assert!(self.children.len() >= 2, "Single child is not supported");

        let second = pick_winner(
            self.children
                .iter()
                .filter(|child| child.user.as_ref() != Some(winner)),
        );
        let second_player = second
            .and_then(|second| second.user.as_ref())
            .expect("Though the winner is filled, second is not filled");
        let second_rank = second
            .and_then(|second| second.rank)
            .expect("Though the winner is filled, second rank is not filled");
        for child in self.children.iter() {
            let player = child
                .user
                .as_ref()
                .expect("Though the winner is filled, children are not filled");
            let player_rank = child
                .rank
                .expect("Though the winner is filled, rank is not filled");
            let battle_result = if player == winner {
                LeagueBattleResult::judge(player, player_rank, second_player, second_rank)
            } else {
                LeagueBattleResult::judge(player, player_rank, winner, 0)
            };

            result
                .entry(player.user_id.clone())
                .or_insert_with(|| (player.clone(), Vec::new()))
                .1
                .push(battle_result);
        }
    }
}

fn get_rank(result: &BTreeMap<UserId, Rank>, user_id: &UserId) -> Rank {
    result.get(user_id).cloned().unwrap_or(INF_RANK)
}

fn pick_winner<'a, T: Iterator<Item = &'a BracketNode>>(children: T) -> Option<&'a BracketNode> {
    children.min_by_key(|child| {
        (
            child.rank.expect("rank is not filled"),
            Reverse(child.user.as_ref().map(|user| user.rating)),
        )
    })
}
