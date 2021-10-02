use scraper::{Html, Selector};

pub(crate) async fn get_affiliation(user_id: &str) -> Result<Option<String>, reqwest::Error> {
    let url = format!("https://atcoder.jp/users/{}", user_id);
    let body = reqwest::get(&url).await?.text().await?;
    Ok(parse(&body))
}

fn parse(body: &str) -> Option<String> {
    let document = Html::parse_document(body);
    let table = document
        .select(&Selector::parse("table.dl-table").unwrap())
        .next()?;
    let row = table
        .select(&Selector::parse("tr").unwrap())
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .next()?;
    let affiliation = row.select(&Selector::parse("td").unwrap()).next()?;
    Some(affiliation.text().next()?.to_string())
}
