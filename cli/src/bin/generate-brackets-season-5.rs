use anyhow::Result;
use cli::bracket_generator::generate_bracket_file;
use cli::HarmonicMean;

fn main() -> Result<()> {
    generate_bracket_file::<HarmonicMean>(
        5,
        "SSRS",
        true,
        &vec![
            (
                "./data/season-5/abc211.json",
                vec![
                    "kyopro_friends",
                    "physics0523",
                    "sugarrr",
                    "tatyam",
                    "blackyuki",
                ],
            ),
            (
                "./data/season-5/abc212.json",
                vec![
                    "kyopro_friends",
                    "mechanicalpenciI",
                    "Nyaan",
                    "penguinman",
                    "sugarrr",
                    "blackyuki",
                    "KoD",
                    "leaf1415",
                ],
            ),
            (
                "./data/season-5/abc213.json",
                vec!["kyopro_friends", "Nyaan", "sugarrr", "physics0523"],
            ),
            (
                "./data/season-5/abc214.json",
                vec![
                    "blackyuki",
                    "KoD",
                    "physics0523",
                    "ynymxiaolongbao",
                    "mechanicalpenciI",
                    "Nyaan",
                    "penguinman",
                ],
            ),
        ],
    )?;

    Ok(())
}
