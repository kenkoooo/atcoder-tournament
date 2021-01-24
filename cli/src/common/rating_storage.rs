use crate::User;
use std::collections::BTreeMap;

pub struct RatingStorage {
    rating_map: BTreeMap<String, User>,
}

impl RatingStorage {
    pub fn new(users: &[User]) -> Self {
        let mut rating_map = BTreeMap::new();
        for user in users {
            let lower_user = user.user_id.to_lowercase();
            rating_map.insert(lower_user, user.clone());
        }
        Self { rating_map }
    }

    pub fn get_rating(&self, user_id: &str) -> Option<User> {
        self.rating_map.get(&user_id.to_lowercase()).cloned()
    }
}
