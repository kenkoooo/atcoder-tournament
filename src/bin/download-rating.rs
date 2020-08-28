use scraper::{Html, Selector};
use serde::Serialize;
use std::fs::File;
use std::io::Write;

#[derive(Serialize)]
struct RatingEntry {
    user_id: String,
    rating: u32,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::ClientBuilder::new().gzip(true).build().unwrap();
    let table_selector = Selector::parse("div.table-responsive").unwrap();
    let tbody_selector = Selector::parse("tbody").unwrap();
    let span_selector = Selector::parse("span").unwrap();
    let tr_selector = Selector::parse("tr").unwrap();

    let mut ratings = vec![];
    for i in 0.. {
        eprintln!("page={}", i + 1);
        let html = client
            .get(&format!("https://atcoder.jp/ranking?page={}", i + 1))
            .send()
            .await?
            .text()
            .await?;
        let document = Html::parse_document(&html);
        let table = document.select(&table_selector).next().unwrap();
        let tbody = table.select(&tbody_selector).next().unwrap();

        let prev_size = ratings.len();
        for tr in tbody.select(&tr_selector) {
            let tds = tr
                .select(&Selector::parse("td").unwrap())
                .collect::<Vec<_>>();
            let user_id = tds[1]
                .select(&span_selector)
                .next()
                .unwrap()
                .text()
                .next()
                .unwrap()
                .to_string();
            let rating: u32 = tds[3].text().next().unwrap().parse().unwrap();
            ratings.push(RatingEntry { user_id, rating });
        }
        if prev_size == ratings.len() {
            break;
        }
    }

    let result = serde_json::to_string(&ratings).unwrap();
    let mut file = File::create("./public/ratings.json").unwrap();
    file.write_all(result.as_bytes()).unwrap();

    Ok(())
}
