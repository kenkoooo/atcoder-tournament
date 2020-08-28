use std::env;

#[async_std::main]
async fn main() -> Result<(), std::io::Error> {
    let port: u16 = env::var("PORT").unwrap().parse().unwrap();
    let address = format!("0.0.0.0:{}", port);

    let mut app = tide::new();
    app.at("/").get(|_| async { Ok("Hello heroku") });
    app.listen(address).await?;
    Ok(())
}
