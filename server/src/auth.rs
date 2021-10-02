use crate::scraping::get_affiliation;
use crate::{generate_random_string, now_secs};
use anyhow::{Context, Result};
use bcrypt::DEFAULT_COST;
use sqlx::postgres::PgRow;
use sqlx::{PgPool, Row};

const EXPIRE_DURATION_SECS: i64 = 600;

pub(crate) async fn stage(user_id: &str, pg_pool: &PgPool) -> Result<String> {
    let now = now_secs();
    let token = generate_random_string(30);
    let token_hash = bcrypt::hash(&token, DEFAULT_COST)?;
    sqlx::query(
        r#"
        INSERT INTO tbl_stage (user_id, token_hash, expires) VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET token_hash=EXCLUDED.token_hash, expires=EXCLUDED.expires
        "#,
    )
    .bind(user_id.to_lowercase())
    .bind(&token_hash)
    .bind(now + EXPIRE_DURATION_SECS)
    .execute(pg_pool)
    .await?;

    Ok(token)
}

pub(crate) async fn signup(user_id: &str, pg_pool: &PgPool) -> Result<String> {
    let affiliation = get_affiliation(user_id)
        .await?
        .context("No affiliation found.")?;
    let now = now_secs();
    let (token_hash, expires) =
        sqlx::query(r"SELECT token_hash, expires FROM tbl_stage WHERE user_id=$1")
            .bind(user_id.to_lowercase())
            .try_map(|row: PgRow| {
                let token_hash: String = row.try_get("token_hash")?;
                let expires: i64 = row.try_get("expires")?;
                Ok((token_hash, expires))
            })
            .fetch_one(pg_pool)
            .await?;
    let verified = bcrypt::verify(affiliation, &token_hash)?;
    let expired = expires < now;

    if verified && !expired {
        let token = generate_random_string(30);
        let token_hash = bcrypt::hash(&token, DEFAULT_COST)?;
        sqlx::query(
            r#"
        INSERT INTO tbl_user (user_id, token_hash) VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET token_hash=EXCLUDED.token_hash
        "#,
        )
        .bind(user_id.to_lowercase())
        .bind(&token_hash)
        .execute(pg_pool)
        .await?;
        Ok(token)
    } else {
        Err(anyhow::anyhow!("Failed verification"))
    }
}

pub(crate) async fn verify(user_id: &str, token: &str, pg_pool: &PgPool) -> Result<bool> {
    let token_hash = sqlx::query(r"SELECT token_hash FROM tbl_user WHERE user_id=$1")
        .bind(user_id.to_lowercase())
        .try_map(|row: PgRow| row.try_get::<String, _>("token_hash"))
        .fetch_one(pg_pool)
        .await?;
    let verified = bcrypt::verify(token, &token_hash)?;
    Ok(verified)
}
