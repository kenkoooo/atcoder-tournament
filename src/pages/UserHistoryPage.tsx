import {
  Box,
  Grid,
  Paper,
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
import { useParams } from "react-router-dom";
import { RatingName } from "../components/RatingName";
import { BattleRecord } from "../models/BattleRecord";
import { BattleResult, User } from "../models/TournamentNode";
import { useBattleRecords, useUserHistories } from "../utils/API";
import { Link as RouterLink } from "react-router-dom";
import { INF_RANK } from "../utils/Constants";

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

const BattleResultRow = (props: {
  userId: string;
  opponent: User;
  season: string;
  classId: string;
  result: BattleResult;
  records: { [key: string]: BattleRecord[] };
}) => {
  const classes = useStyles();
  const { userId, opponent, season, classId, result, records } = props;

  const opponentResult = records[opponent.user_id]
    ?.find((record) => record.class === classId && record.season === season)
    ?.battles.find((battle) => battle.opponent?.user_id === userId);

  const formatResult = (result: BattleResult) => {
    switch (result.result) {
      case "SkipLose":
        if (season === "1") {
          return null;
        } else {
          return "不戦敗";
        }
      case "Win": {
        const opponentRank =
          opponentResult?.result.result === "Lose"
            ? opponentResult.result.rank
            : 0;
        if (
          opponentRank >= INF_RANK ||
          opponentResult?.result.result === "SkipLose" ||
          opponentResult?.result.result === "Writer"
        ) {
          return "○ (不戦勝)";
        } else {
          return "○";
        }
      }
      case "Lose":
        if (season === "1" && result.rank >= INF_RANK) {
          return null;
        } else {
          return "×";
        }
      case "SkipWin":
        return "不戦勝";
      case "Writer":
        return "Writer";
      case "NotYet":
        return null;
    }
  };

  const formattedResult = formatResult(result);
  if (!formattedResult) {
    return null;
  } else if (formattedResult === "Writer") {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Writer</TableCell>
        <TableCell>
          <Link
            component={RouterLink}
            to={`/tournament/${season}`}
            className={classes.link}
          >
            第{season}期 {classId}クラス
          </Link>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow>
        <TableCell>
          <RatingName rating={opponent.rating}>{opponent.user_id}</RatingName>
        </TableCell>
        <TableCell>{formattedResult}</TableCell>
        <TableCell>
          <Link
            component={RouterLink}
            to={`/tournament/${season}`}
            className={classes.link}
          >
            第{season}期 {classId}クラス
          </Link>
        </TableCell>
      </TableRow>
    );
  }
};

export const UserHistoryPage = () => {
  const classes = useStyles();
  const { user_id } = useParams<{ user_id: string }>();
  const histories = useUserHistories().data;
  const records = useBattleRecords().data;
  if (!histories || !records) {
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
    .sort((a, b) => b.season - a.season);

  const winCount = sorted
    .filter((e) => e.result.class === "A" || e.result.class === "A1")
    .filter((e) => e.result.top_k === 1).length;
  const secondCount = sorted
    .filter((e) => e.result.class === "A" || e.result.class === "A1")
    .filter((e) => e.result.top_k === 2).length;
  const a1Count = sorted.filter((e) => e.result.class === "A1").length;

  const userRecord = (records[user_id] ?? [])
    .sort((a, b) => b.season.localeCompare(a.season))
    .flatMap((record) => {
      const { class: classId, user, battles, season } = record;
      const reversed = Array.from(battles).reverse();
      return reversed
        .filter((battle): battle is {
          opponent: User;
          result: BattleResult;
        } => {
          return battle.opponent !== null;
        })
        .map((battle) => {
          const { opponent, result } = battle;
          return {
            user,
            opponent,
            season,
            classId,
            result,
          };
        });
    });

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item>
          <Typography variant="h2">
            <Link
              className={classes.link}
              href={`https://atcoder.jp/users/${user_id}`}
            >
              {user_id}
            </Link>
          </Typography>
          {winCount > 0 && (
            <Typography variant="h6">優勝{winCount}回</Typography>
          )}
          {secondCount > 0 && (
            <Typography variant="h6">準優勝{secondCount}回</Typography>
          )}
          {a1Count > 0 && (
            <Typography variant="h6">A1在籍{a1Count}期</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
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
                <Grid item xs={4} direction="column" container>
                  <Typography variant="body1">トーナメント</Typography>
                  <Typography variant="h4">
                    {formatTopK(e.season, e.result.top_k, e.result.class)}
                  </Typography>
                </Grid>
                {e.result.final_rank && (
                  <Grid item xs direction="column" container>
                    <Typography variant="body1">最終順位</Typography>
                    <Typography variant="h4">
                      {e.result.final_rank}位
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>対戦相手</TableCell>
                  <TableCell>勝敗</TableCell>
                  <TableCell>トーナメント</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRecord.map((record, i) => (
                  <BattleResultRow
                    key={i}
                    {...record}
                    userId={user_id}
                    records={records}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
