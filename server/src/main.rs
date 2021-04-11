use actix_web::dev::HttpResponseBuilder;
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use reqwest::StatusCode;
use serde::Deserialize;
use sqlx::postgres::{PgPoolOptions, PgRow};
use sqlx::{PgPool, Row};
use std::env;
use std::time::Duration;

async fn insert_user(user_id: &str, token: &str, pg_pool: &PgPool) -> anyhow::Result<()> {
    let verify_request = serde_json::json!({
        "user_id": user_id,
        "token": token
    });

    log::info!("verifying");

    let client = reqwest::Client::new();
    let response = client
        .post("https://atcoder-auth.kenkoooo.com/api/verify")
        .json(&verify_request)
        .send()
        .await?;
    if !response.status().is_success() {
        return Err(anyhow::anyhow!("Verification failed"));
    }

    sqlx::query("INSERT INTO tbl_users (atcoder_id) VALUES ($1)")
        .bind(user_id)
        .execute(pg_pool)
        .await?;

    Ok(())
}
async fn get_users(pg_pool: &PgPool) -> anyhow::Result<Vec<String>> {
    let user_ids: Vec<String> = sqlx::query("SELECT atcoder_id FROM tbl_users")
        .map(|row: PgRow| {
            let user_id: String = row.get("atcoder_id");
            user_id
        })
        .fetch_all(pg_pool)
        .await?;
    Ok(user_ids)
}

#[derive(Deserialize)]
struct RegisterRequest {
    user_id: String,
    token: String,
}

#[post("/api/user")]
async fn register(
    request: web::Form<RegisterRequest>,
    pg_pool: web::Data<PgPool>,
) -> actix_web::Result<HttpResponse, actix_web::Error> {
    insert_user(&request.user_id, &request.token, pg_pool.get_ref())
        .await
        .map_err(|e| {
            log::error!("{:?}", e);
            HttpResponseBuilder::new(StatusCode::INTERNAL_SERVER_ERROR)
        })?;
    let response = HttpResponseBuilder::new(StatusCode::OK)
        .header("Access-Control-Allow-Origin", "*")
        .finish();
    Ok(response)
}

#[get("/api/users")]
async fn users(pg_pool: web::Data<PgPool>) -> actix_web::Result<HttpResponse, actix_web::Error> {
    let users = get_users(pg_pool.get_ref()).await.map_err(|e| {
        log::error!("{:?}", e);
        HttpResponseBuilder::new(StatusCode::INTERNAL_SERVER_ERROR)
    })?;
    let response = HttpResponseBuilder::new(StatusCode::OK)
        .header("Access-Control-Allow-Origin", "*")
        .json(&users);
    Ok(response)
}

#[actix_web::main]
async fn main() -> anyhow::Result<()> {
    env::set_var("RUST_LOG", "info");
    env_logger::init();

    let port: u16 = env::var("PORT").unwrap().parse()?;
    let address = format!("0.0.0.0:{}", port);

    let database_url = env::var("DATABASE_URL").unwrap();
    let pg_pool = PgPoolOptions::new()
        .max_lifetime(Some(Duration::from_secs(60 * 5)))
        .max_connections(15)
        .connect(&database_url)
        .await?;

    sqlx::query(
        r"
        CREATE TABLE IF NOT EXISTS tbl_users (
            atcoder_id TEXT NOT NULL,
            PRIMARY KEY (atcoder_id)
    )",
    )
    .execute(&pg_pool)
    .await?;

    HttpServer::new(move || {
        App::new()
            .service(register)
            .service(users)
            .data(pg_pool.clone())
    })
    .bind(address)?
    .run()
    .await?;
    Ok(())
}
