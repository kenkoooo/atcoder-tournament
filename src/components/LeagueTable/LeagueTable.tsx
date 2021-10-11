import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { BattleResult, LeagueEntry } from "../../models/TournamentNode";
import { RatingName } from "../RatingName";
import { DUMMY_USER_ID_PREFIX } from "../../utils/Constants";

const isUsingRankSum = (seasonId: string) => ["2", "3", "4"].includes(seasonId);

const UserEntryRow = (props: {
  entry: LeagueEntry;
  maxResultCount: number;
}) => {
  const { entry, maxResultCount } = props;
  return (
    <TableRow>
      <TableCell align="right">{`${entry.provisional_rank}${ordinalSuffixOf(
        entry.provisional_rank
      )}`}</TableCell>
      <TableCell>
        <RatingName rating={entry.user.rating}>{entry.user.user_id}</RatingName>
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
      <TableCell align="right">{entry.rank_sum.toFixed(2)}</TableCell>
    </TableRow>
  );
};

interface Props {
  seasonId: string;
  league: LeagueEntry[];
  promotionRank?: number;
  dropRank?: number;
}

export const LeagueTable = (props: Props) => {
  const maxResultCount = Math.max(...props.league.map((e) => e.results.length));
  const league = props.league.filter(
    (entry) => !entry.user.user_id.startsWith(DUMMY_USER_ID_PREFIX)
  );
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">順位</TableCell>
            <TableCell>ユーザー</TableCell>
            {Array.from(Array(maxResultCount).keys()).map((e, i) => (
              <TableCell key={i} align="center">
                {i + 1}回戦
              </TableCell>
            ))}
            <TableCell align="right">勝利数</TableCell>
            <TableCell align="right">
              {isUsingRankSum(props.seasonId) ? "順位合計" : "順位調和平均"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {league.map((entry, idx) => {
            if (entry.provisional_rank === props.promotionRank) {
              return (
                <Fragment key={idx}>
                  <UserEntryRow entry={entry} maxResultCount={maxResultCount} />
                  <TableRow>
                    <TableCell colSpan={maxResultCount + 4}>
                      昇格ライン
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            } else if (entry.provisional_rank === props.dropRank) {
              return (
                <Fragment key={idx}>
                  <TableRow>
                    <TableCell colSpan={maxResultCount + 4}>
                      残留ライン
                    </TableCell>
                  </TableRow>
                  <UserEntryRow entry={entry} maxResultCount={maxResultCount} />
                </Fragment>
              );
            } else {
              return (
                <UserEntryRow
                  entry={entry}
                  maxResultCount={maxResultCount}
                  key={idx}
                />
              );
            }
          })}
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
