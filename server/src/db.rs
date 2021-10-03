use anyhow::Result;
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgRow;
use sqlx::types::Json;
use sqlx::{PgPool, Row};

#[derive(Serialize, Deserialize)]
pub struct UserData {
    participate_next: bool,
    participate_forever: bool,
}

pub(crate) async fn get_user_data(user_id: &str, pg_pool: &PgPool) -> Result<UserData> {
    let data = sqlx::query("SELECT user_data FROM tbl_user WHERE user_id=$1")
        .bind(user_id)
        .try_map(|row: PgRow| row.try_get::<Json<UserData>, _>("user_data"))
        .fetch_one(pg_pool)
        .await?;
    Ok(data.0)
}

pub(crate) async fn put_user_data(
    user_id: &str,
    user_data: &UserData,
    pg_pool: &PgPool,
) -> Result<()> {
    sqlx::query(
        r"
            INSERT INTO tbl_user (user_id, user_data) VALUES ($1, $2)
            ON CONFLICT (user_id)
            DO UPDATE SET user_data = EXCLUDED.user_data",
    )
    .bind(user_id)
    .bind(Json(user_data))
    .execute(pg_pool)
    .await?;
    Ok(())
}

pub(crate) async fn get_users(pg_pool: &PgPool) -> Result<Vec<String>> {
    let data = sqlx::query("SELECT user_id, user_data FROM tbl_user")
        .try_map(|row: PgRow| {
            let user_data: Json<UserData> = row.try_get("user_data")?;
            let user_id: String = row.try_get("user_id")?;
            Ok((user_id, user_data))
        })
        .fetch_all(pg_pool)
        .await?;
    let users = data
        .into_iter()
        .filter(|t| t.1.participate_next)
        .map(|t| t.0)
        .collect();
    Ok(users)
}
