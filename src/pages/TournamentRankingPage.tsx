import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useTournamentList } from "../utils/API";

const useStyles = makeStyles(() => ({
  link: {
    color: "white",
  },
  table: {
    maxWidth: 800,
  },
}));
export const TournamentRankingPage = () => {
  const classes = useStyles();
  const { seasonId } = useParams<{ seasonId: string }>();
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
  const ranking = tournaments.find(
    (tournament) => tournament.season === seasonId && tournament.expandable
  )?.ranking;
  if (!ranking) {
    return <p>not found</p>;
  }
  ranking.sort((a, b) => a[0] - b[0]);
  return (
    <Box display="flex" justifyContent="center">
      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>総合順位</TableCell>
              <TableCell>クラス</TableCell>
              <TableCell>クラス内順位</TableCell>
              <TableCell>ユーザー名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.map(([rank, entry]) => (
              <TableRow key={rank}>
                <TableCell>{rank + 1}</TableCell>
                <TableCell>{entry.class}</TableCell>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>
                  <Typography variant="h6">
                    <Link
                      className={classes.link}
                      component={RouterLink}
                      to={`/user/${entry.user_id}`}
                    >
                      {entry.user_id}
                    </Link>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
