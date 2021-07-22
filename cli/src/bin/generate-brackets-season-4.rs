use anyhow::Result;
use cli::bracket_generator::generate_bracket_file;

fn main() -> Result<()> {
    generate_bracket_file::<i64>(
        4,
        "Tiramister",
        true,
        &vec![
            ("./data/season-4/abc204.json", vec!["kyopro_friends"]),
            (
                "./data/season-4/abc205.json",
                vec![
                    "chokudai",
                    "kyopro_friends",
                    "KoD",
                    "tozangezan",
                    "penguinman",
                    "tatyam",
                ],
            ),
            (
                "./data/season-4/abc207.json",
                vec!["penguinman", "ynymxiaolongbao"],
            ),
            ("./data/season-4/abc208.json", vec!["Nyaan", "KoD"]),
            (
                "./data/season-4/abc209.json",
                vec!["blackyuki", "penguinman"],
            ),
        ],
    )?;

    Ok(())
}
