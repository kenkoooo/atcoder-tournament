import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { TournamentBracket } from "../components/TournamentBracket";
import { makeTree } from "../components/TournamentBracket/TreeMaker";
import {
  fetchContestResults,
  fetchOrderedUserList,
  fetchRatingMap,
} from "../utils/API";
import { UNDEFINED_NODE } from "../utils/Constants";
import { resolveTournament } from "../utils/ResultResolver";
import "./tournament.scss";

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
  const [ratingMap, setRatingMap] = useState<Map<string, number> | null>(null);
  const [contestResults, setContestResults] = useState<
    Map<string, number>[] | null
  >(null);
  const classes = useStyles();

  useEffect(() => {
    fetchOrderedUserList(props.seasonId).then((users) =>
      setAtCoderUserIds(users)
    );
  }, [props.seasonId]);
  useEffect(() => {
    if (!ratingMap) {
      fetchRatingMap().then((map) => setRatingMap(map));
    }
    if (!contestResults) {
      fetchContestResults().then((maps) => setContestResults(maps));
    }
  });

  const pickWinner = (index: number, children: string[]) => {
    if (!contestResults || contestResults.length <= index) {
      return UNDEFINED_NODE;
    }
    const ranks = children.map((child) => {
      return contestResults[index].get(child) ?? 100000;
    });
    const ratings = children.map((child) => {
      return ratingMap?.get(child) ?? 0;
    });
    const userInfo = children.map((userId, i) => ({
      userId,
      rating: ratings[i],
      rank: ranks[i],
    }));
    const sorted = userInfo.sort((a, b) => {
      if (a.rank === b.rank) {
        return b.rating - a.rating;
      }
      return a.rank - b.rank;
    });
    return sorted[0].userId;
  };

  const root =
    atCoderUserIds.length > 0
      ? makeTree(atCoderUserIds)
      : { name: "loading", children: [] };
  const resolvedRoot = resolveTournament(root, pickWinner);

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
          <Typography
              component="div"
              variant="body1"
              align="center"
              color="textPrimary"
              gutterBottom
          >
            {`現在の参加人数: ${atCoderUserIds.length}`}
          </Typography>
          <TournamentBracket
            root={resolvedRoot}
            getRating={(userId) => ratingMap?.get(userId)}
          />
        </Grid>
      </Container>
    </>
  );
};
