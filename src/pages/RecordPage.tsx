import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useUserHistories } from "../utils/API";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  link: {
    color: "white",
  },
}));
export const RecordPage = () => {
  const classes = useStyles();
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
  const users = histories
    .map((e) => {
      const userId = e.user_id;
      const histories = Object.values(e.histories).filter(
        (h) => h.class === "A1" || h.class === "A"
      );
      const winCount = histories.filter((h) => h.top_k === 1).length;
      const secondCount = histories.filter((h) => h.top_k === 2).length;
      const fourCount = histories.filter((h) => h.top_k === 4).length;
      const a1Count = histories.filter((h) => h.class === "A1").length;
      return {
        a1Count,
        winCount,
        secondCount,
        fourCount,
        userId,
      };
    })
    .filter((x) => x.a1Count + x.winCount + x.secondCount + x.fourCount > 0);
  users.sort((a, b) => {
    if (a.winCount !== b.winCount) {
      return b.winCount - a.winCount;
    }
    if (a.secondCount !== b.secondCount) {
      return b.secondCount - a.secondCount;
    }
    if (a.fourCount !== b.fourCount) {
      return b.fourCount - a.fourCount;
    }
    if (a.a1Count !== b.a1Count) {
      return b.a1Count - a.a1Count;
    }
    return a.userId.localeCompare(b.userId);
  });

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">ユーザー</TableCell>
            <TableCell variant="head" align="center">
              優勝
            </TableCell>
            <TableCell variant="head" align="center">
              準優勝
            </TableCell>
            <TableCell variant="head" align="center">
              ベスト4
            </TableCell>
            <TableCell variant="head" align="center">
              A1在籍
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell variant="head">
                <Typography variant="h6">
                  <Link
                    className={classes.link}
                    component={RouterLink}
                    to={`/user/${user.userId}`}
                  >
                    {user.userId}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell align="center">{user.winCount}</TableCell>
              <TableCell align="center">{user.secondCount}</TableCell>
              <TableCell align="center">{user.fourCount}</TableCell>
              <TableCell align="center">{user.a1Count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
