import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
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
  link: {
    color: theme.palette.grey[50],
  },
}));

const HistoryRow = (e: TournamentHistory) => {
  const classes = useStyles();
  const ranking = e.ranking.map(([rank, entry]) => ({
    class: entry.class,
    userId: entry.user_id,
    rank,
  }));
  ranking.sort((a, b) => a.rank - b.rank);

  const first: string | undefined = ranking[0]?.userId;
  const second: string | undefined = ranking[1]?.userId;

  return (
    <TableRow>
      <TableCell variant="head">{e.season}</TableCell>
      <TableCell>
        <Typography variant="h6">
          <Link
            className={classes.link}
            component={RouterLink}
            to={`/user/${first}`}
          >
            {first}
          </Link>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6">
          <Link
            className={classes.link}
            component={RouterLink}
            to={`/user/${second}`}
          >
            {second}
          </Link>
        </Typography>
      </TableCell>
      <TableCell>
        <Link
          component={RouterLink}
          variant="button"
          color="textPrimary"
          to={`/tournament/${e.season}`}
          className={classes.link}
        >
          {`第${e.season}期トーナメント表`}
        </Link>
      </TableCell>
    </TableRow>
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

  tournaments.sort((a, b) => {
    const aSeason = parseInt(a.season);
    const bSeason = parseInt(b.season);
    return bSeason - aSeason;
  });

  return (
    <Container className={classes.root}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>期</TableCell>
              <TableCell>優勝</TableCell>
              <TableCell>準優勝</TableCell>
              <TableCell>トーナメント表</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((e) => (
              <HistoryRow key={e.season} {...e} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
