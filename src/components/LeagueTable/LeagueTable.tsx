import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { BattleResult, LeagueEntry } from "../../models/TournamentNode";
import { RatingName } from "../RatingName";

interface Props {
  league: LeagueEntry[];
}

export const LeagueTable = (props: Props) => {
  const { league } = props;
  const maxResultCount = Math.max(...league.map((e) => e.results.length));

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>リーグ内順位</TableCell>
            <TableCell>ユーザー</TableCell>
            {Array.from(Array(maxResultCount).keys()).map((e, i) => (
              <TableCell key={i} align="center">
                {i + 1}回戦
              </TableCell>
            ))}
            <TableCell>勝利数</TableCell>
            <TableCell>順位合計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.league.map((entry, i) => (
            <TableRow key={entry.user.user_id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <RatingName rating={entry.user.rating}>
                  {entry.user.user_id}
                </RatingName>
              </TableCell>
              {Array.from(Array(maxResultCount).keys()).map((e, i) => {
                const result = entry.results[i];
                if (result) {
                  return (
                    <TableCell key={i} align="center">
                      <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        {result.opponent && (
                          <RatingName rating={result.opponent.rating}>
                            {result.opponent.user_id}
                          </RatingName>
                        )}
                        <span>{formatBattleResult(result.result)}</span>
                        <span>{formatRank(result.result)}</span>
                      </Box>
                    </TableCell>
                  );
                } else {
                  return <TableCell key={i}>{i + 1}回戦</TableCell>;
                }
              })}
              <TableCell align="right">{entry.win_count}</TableCell>
              <TableCell align="right">{entry.rank_sum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const formatBattleResult = (battleResult: BattleResult) => {
  switch (battleResult.result) {
    case "Win":
    case "SkipWin":
      return "○";
    case "Lose":
    case "SkipLose":
      return "×";
    case "NotYet":
    case "Writer":
      return "-";
  }
};

const formatRank = (battleResult: BattleResult) => {
  switch (battleResult.result) {
    case "Win":
    case "Lose":
      const rank = battleResult.rank;
      return `${rank}${ordinalSuffixOf(rank)}`;
    default:
      return "-";
  }
};

const ordinalSuffixOf = (i: number): "st" | "nd" | "rd" | "th" => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
};
