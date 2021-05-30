import { Box, Grid, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TournamentHistory } from "../models/TournamentHistory";
import { useTournamentList } from "../utils/API";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 800,
  },
  paper: {
    padding: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  caption: {
    marginRight: 20,
    minWidth: 80,
  },
  link: {
    color: "white",
  },
}));

const Winners = (e: TournamentHistory) => {
  const classes = useStyles();
  const winners = e.ranking
    .map(([rank, entry]) => ({
      rank: rank + 1,
      userId: entry.user_id,
    }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 4);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h3">
            <Link
              component={RouterLink}
              to={`/tournament/${e.season}`}
              className={classes.link}
            >
              第{e.season}期
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6} direction="column" spacing={2}>
          {winners.map((winner) => {
            if (winner.rank === 1) {
              return (
                <Box display="flex" alignItems="center">
                  <Typography className={classes.caption} variant="h4">
                    優勝
                  </Typography>
                  <Typography variant="h2">{winner.userId}</Typography>
                </Box>
              );
            } else if (winner.rank === 2) {
              return (
                <Box display="flex" alignItems="center">
                  <Typography className={classes.caption} variant="h6">
                    準優勝
                  </Typography>
                  <Typography variant="h4">{winner.userId}</Typography>
                </Box>
              );
            } else {
              return (
                <Box display="flex" alignItems="center">
                  <Typography className={classes.caption} variant="h6">
                    第{winner.rank}位
                  </Typography>
                  <Typography variant="h5">{winner.userId}</Typography>
                </Box>
              );
            }
          })}
          {e.expandable && (
            <Box marginTop={2}>
              <Link
                className={classes.link}
                component={RouterLink}
                to={`/ranking/${e.season}`}
              >
                全てのランキングを表示
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export const TournamentListPage = () => {
  const classes = useStyles();
  const tournaments = useTournamentList().data;
  if (!tournaments) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  tournaments.sort((a, b) => b.season.localeCompare(a.season));

  return (
    <Container className={classes.root}>
      <Typography variant="h2">過去の開催</Typography>
      <Container>
        {tournaments.map((e) => (
          <Winners key={e.season} {...e} />
        ))}
      </Container>
    </Container>
  );
};
