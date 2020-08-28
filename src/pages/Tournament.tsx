import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { TournamentBracket } from "../components/TournamentBracket";
import { makeTree } from "../components/TournamentBracket/TreeMaker";
import "./tournament.scss";

interface Props {
  season_id: string;
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export const Tournament = (props: Props) => {
  const [atCoderUserIds, setAtCoderUserIds] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(
      `https://atcoder-tournament.herokuapp.com/api/users?season_id=${props.season_id}`
    )
      .then((response) => response.json())
      .then((response) => setAtCoderUserIds(response));
  }, [props.season_id]);

  const root =
    atCoderUserIds.length > 0
      ? makeTree(atCoderUserIds)
      : { name: "loading", children: [] };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.heroContent}>
        <Grid container justify="center" direction="column">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            AtCoder Beginner Contest Tournament
          </Typography>
          <TournamentBracket root={root} />
        </Grid>
      </Container>
    </>
  );
};
