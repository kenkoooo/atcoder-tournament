use anyhow::Result;
use cli::bracket_generator::generate_bracket_file;
use cli::HarmonicMean;

fn main() -> Result<()> {
    generate_bracket_file::<HarmonicMean>(
        5,
        "SSRS",
        true,
        &vec![(
            "./data/season-5/abc211.json",
            vec![
                "kyopro_friends",
                "physics0523",
                "sugarrr",
                "tatyam",
                "blackyuki",
            ],
        )],
    )?;

    Ok(())
}
