use anyhow::Result;
use cli::bracket_generator::generate_bracket_file;

fn main() -> Result<()> {
    generate_bracket_file::<i64>(5, "SSRS", true, &vec![])?;

    Ok(())
}
