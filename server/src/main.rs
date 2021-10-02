use actix_web::web::Data;
use actix_web::{App, HttpServer};
use server::api;
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::time::Duration;

#[actix_web::main]
async fn main() -> anyhow::Result<()> {
    env::set_var("RUST_LOG", "info");
    env_logger::init();

    let port: u16 = env::var("PORT").expect("set PORT").parse()?;
    let address = format!("0.0.0.0:{}", port);

    let database_url = env::var("DATABASE_URL").expect("set DATABASE_URL");
    let pg_pool = PgPoolOptions::new()
        .max_lifetime(Some(Duration::from_secs(60 * 5)))
        .max_connections(15)
        .connect(&database_url)
        .await?;

    let hash = bcrypt::verify(
        "xoWXxRFcepBmNRUJFuCZFvTU1GbCu6",
        "$2b$12$UBz/EvyR4fDdxd70whCpaeOCFewAN.4S2Oy.LMxV0/3WVIbU.1xDi",
    )?;
    log::info!("{}", hash);

    HttpServer::new(move || {
        App::new()
            .service(api::post_signup)
            .service(api::post_stage)
            .service(api::get_verify)
            .app_data(Data::new(pg_pool.clone()))
    })
    .bind(address)?
    .run()
    .await?;
    Ok(())
}
