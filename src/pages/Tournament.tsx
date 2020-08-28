import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { TournamentBracket } from "../components/TournamentBracket";
import { makeTree } from "../components/TournamentBracket/TreeMaker";
import "./tournament.scss";
import { fetchAllUserList, fetchUserList } from "../utils/API";

interface Props {
  seasonId: string;
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
    Promise.all([fetchAllUserList(), fetchUserList(props.seasonId)]).then(
      ([allUsers, registeredUsers]) => {
        const userSet = new Set(allUsers);
        const validUsers = registeredUsers.filter((userId) =>
          userSet.has(userId)
        );
        setAtCoderUserIds(validUsers);
      }
    );
  }, [props.seasonId]);

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
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            登録締め切り : 2020年8月29日 19:00 JST
          </Typography>
          <TournamentBracket root={root} />
        </Grid>
      </Container>
    </>
  );
};
