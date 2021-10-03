use actix_cors::Cors;
use actix_web::http::header;
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

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin_fn(|_, _| true)
            .allowed_methods(vec!["GET", "POST"])
            .allowed_header(header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);
        App::new()
            .wrap(cors)
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
