use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::fs::{read_to_string, File};
use std::io::Write;

const PATH: &str = "./public/ratings.json";

#[derive(Serialize, Deserialize)]
struct RatingEntry {
    user_id: String,
    birth: Option<u32>,
    rating: u32,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::ClientBuilder::new().gzip(true).build().unwrap();
    let table_selector = Selector::parse("div.table-responsive").unwrap();
    let tbody_selector = Selector::parse("tbody").unwrap();
    let span_selector = Selector::parse("span").unwrap();
    let tr_selector = Selector::parse("tr").unwrap();

    let mut ratings = BTreeMap::new();
    let content = read_to_string(PATH)?;
    let old_ratings: Vec<RatingEntry> = serde_json::from_str(&content)?;
    for rating in old_ratings {
        ratings.insert(rating.user_id.clone(), rating);
    }

    for i in 0.. {
        eprintln!("page={}", i + 1);
        let html = client
            .get(&format!(
                "https://atcoder.jp/ranking/all?contestType=algo&page={}",
                i + 1
            ))
            .send()
            .await?
            .text()
            .await?;
        let document = Html::parse_document(&html);
        let table = document.select(&table_selector).next().unwrap();
        let tbody = table.select(&tbody_selector).next().unwrap();

        let mut pushed = false;
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
            let birth: Option<u32> = tds[2].text().next().and_then(|x| x.parse().ok());
            let rating: u32 = tds[4].text().next().unwrap().parse().unwrap();
            ratings.insert(
                user_id.clone(),
                RatingEntry {
                    rating,
                    birth,
                    user_id,
                },
            );
            pushed = true;
        }
        if !pushed {
            break;
        }
    }

    let ratings = ratings.into_values().collect::<Vec<_>>();
    let result = serde_json::to_string(&ratings)?;
    let mut file = File::create(PATH)?;
    file.write_all(result.as_bytes())?;

    Ok(())
}
