use serde::{Deserialize, Serialize};
use std::cmp::{Ordering, Reverse};

#[derive(Serialize, Deserialize, Eq, PartialEq, Debug)]
pub struct User {
    pub user_id: String,
    pub rating: i64,
}

impl Ord for User {
    fn cmp(&self, other: &Self) -> Ordering {
        (Reverse(self.rating), self.user_id.to_lowercase().as_str())
            .cmp(&(Reverse(other.rating), other.user_id.to_lowercase().as_str()))
    }
}
impl PartialOrd for User {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

#[derive(Debug, Serialize, Clone)]
pub struct Node<'a> {
    pub user: Option<&'a User>,
    pub rank: Option<i64>,
    pub children: Vec<Node<'a>>,
}

#[derive(Debug, Serialize, Clone)]
pub struct Response<'a> {
    pub node: Node<'a>,
}
