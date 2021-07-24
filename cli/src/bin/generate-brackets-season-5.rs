use anyhow::Result;
use cli::bracket_generator::generate_bracket_file;
use cli::HarmonicMean;

fn main() -> Result<()> {
    generate_bracket_file::<HarmonicMean>(5, "SSRS", true, &vec![])?;

    Ok(())
}
