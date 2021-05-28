import { Box, Grid, Paper, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useParams } from "react-router-dom";
import { useUserHistories } from "../utils/API";
import { Link as RouterLink } from "react-router-dom";

const formatTopK = (season: number, topK: number, klass: string) => {
  if (topK === 1) {
    if (klass === "A" || klass === "A1") {
      return `第${season}期王者`;
    } else {
      return "優勝";
    }
  } else if (topK === 2) {
    return "準優勝";
  } else {
    return `ベスト${topK}`;
  }
};

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
  link: {
    color: "white",
  },
}));

export const UserHistoryPage = () => {
  const classes = useStyles();
  const { user_id } = useParams<{ user_id: string }>();
  const histories = useUserHistories().data;
  if (!histories) {
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

  const userHistory =
    histories.find((e) => e.user_id === user_id)?.histories ?? {};
  const sorted = Object.entries(userHistory)
    .map(([season, result]) => ({
      season: parseInt(season),
      result,
    }))
    .sort((a, b) => a.season - b.season);
  return (
    <Container className={classes.root}>
      <Typography variant="h2">
        <Link
          className={classes.link}
          href={`https://atcoder.jp/users/${user_id}`}
        >
          {user_id}
        </Link>
      </Typography>
      <Container>
        {sorted.map((e) => (
          <Paper key={e.season} className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5">
                  <Link
                    component={RouterLink}
                    to={`/tournament/${e.season}`}
                    className={classes.link}
                  >
                    第{e.season}期 {e.result.class}クラス
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={4} direction="column">
                <Typography variant="body1">トーナメント</Typography>
                <Typography variant="h4">
                  {formatTopK(e.season, e.result.top_k, e.result.class)}
                </Typography>
              </Grid>
              {e.result.final_rank && (
                <Grid item xs direction="column">
                  <Typography variant="body1">最終順位</Typography>
                  <Typography variant="h4">{e.result.final_rank}位</Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}
      </Container>
    </Container>
  );
};
