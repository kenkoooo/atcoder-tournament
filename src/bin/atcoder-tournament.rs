use anyhow::Result;
use serde::Deserialize;
use sqlx::postgres::PgRow;
use sqlx::Row;
use std::{env, time::Duration};
use tide::{Request, Response};

trait ResponseExt {
    fn json<S: serde::Serialize>(body: &S) -> tide::Result<Self>
    where
        Self: Sized;
    fn make_cors(self) -> Self;
}

impl ResponseExt for Response {
    fn json<S: serde::Serialize>(body: &S) -> tide::Result<Self>
    where
        Self: Sized,
    {
        let response = Self::builder(tide::StatusCode::Ok)
            .content_type(tide::http::mime::JSON)
            .body(tide::Body::from_json(body)?)
            .build();
        Ok(response)
    }
    fn make_cors(self) -> Self {
        let mut response = self;
        response.insert_header(tide::http::headers::ACCESS_CONTROL_ALLOW_ORIGIN, "*");
        response
    }
}

#[derive(Clone)]
struct State {
    pg_pool: sqlx::PgPool,
}

async fn insert_user(mut request: Request<State>) -> tide::Result<Response> {
    #[derive(Deserialize)]
    struct Body {
        atcoder_id: String,
        season_id: i64,
    }

    let body = request.body_form::<Body>().await?;
    sqlx::query("INSERT INTO tbl_users (atcoder_id, season_id) VALUES ($1, $2)")
        .bind(body.atcoder_id)
        .bind(body.season_id)
        .execute(&request.state().pg_pool)
        .await?;
    Ok(Response::new(tide::StatusCode::Ok).make_cors())
}

async fn get_users(request: Request<State>) -> tide::Result<Response> {
    #[derive(Deserialize)]
    struct Query {
        season_id: i64,
    }

    let query: Query = request.query::<Query>()?;
    let pg_pool = &request.state().pg_pool;

    let atcoder_ids = sqlx::query("SELECT atcoder_id FROM tbl_users WHERE season_id=$1")
        .bind(query.season_id)
        .try_map(|row: PgRow| {
            let atcoder_id: String = row.try_get("atcoder_id")?;
            Ok(atcoder_id)
        })
        .fetch_all(pg_pool)
        .await?;
    let response = Response::json(&atcoder_ids)?;
    Ok(response.make_cors())
}

#[async_std::main]
async fn main() -> Result<()> {
    let port: u16 = env::var("PORT").unwrap().parse()?;
    let address = format!("0.0.0.0:{}", port);

    let database_url = env::var("DATABASE_URL").unwrap();
    let pg_pool = sqlx::PgPool::builder()
        .max_lifetime(Some(Duration::from_secs(60 * 5)))
        .max_size(15)
        .build(&database_url)
        .await?;

    sqlx::query(
        r"
        CREATE TABLE IF NOT EXISTS tbl_users (
            atcoder_id TEXT NOT NULL,
            season_id INTEGER NOT NULL,
            PRIMARY KEY (atcoder_id, season_id)
    )",
    )
    .execute(&pg_pool)
    .await?;

    let mut app = tide::with_state(State { pg_pool });
    app.at("/").get(|_| async { Ok("Hello heroku") });
    app.at("/api/users").get(get_users);
    app.at("/api/user").post(insert_user);
    app.listen(address).await?;
    Ok(())
}
