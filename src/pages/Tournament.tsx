import {
  Box,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TournamentBoard } from "../components/TournamentBoard";
import { BracketNode } from "../models/BracketNode";
import { fetchContestResults, fetchOrderedUserList } from "../utils/API";
import { MAXIMUM_MEMBER } from "../utils/Constants";

const formatClass = (index: number) => {
  if (index === 0) {
    return "A";
  }
  if (index < 3) {
    return `B${index}`;
  }
  if (index < 7) {
    return `C${index - 2}`;
  }
  return `D${index - 6}`;
};

interface Props {
  seasonId: string;
}

export const Tournament = (props: Props) => {
  const [atCoderUserIds, setAtCoderUserIds] = useState<BracketNode[]>([]);
  const [contestResults, setContestResults] = useState<
    Map<string, number>[] | undefined
  >(undefined);
  const [selectedDivision, setSelectedDivision] = useState(0);

  useEffect(() => {
    fetchOrderedUserList(props.seasonId).then((users) =>
      setAtCoderUserIds(users)
    );
  }, [props.seasonId]);
  useEffect(() => {
    if (!contestResults) {
      fetchContestResults().then((maps) => setContestResults(maps));
    }
  });

  const divisionCount = Math.ceil(atCoderUserIds.length / MAXIMUM_MEMBER);
  const divisionMembers = Math.ceil(
    atCoderUserIds.length / Math.max(divisionCount, 1)
  );

  const divisions = [] as BracketNode[][];
  let i = atCoderUserIds.length - 1;
  while (i >= 0) {
    const division = [] as BracketNode[];
    while (i >= 0 && division.length < divisionMembers) {
      division.push(atCoderUserIds[i]);
      i -= 1;
    }
    divisions.push(division.reverse());
  }
  divisions.reverse();

  return (
    <>
      <CssBaseline />
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
          シーズン 1
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {`参加人数: ${atCoderUserIds.length}`}
        </Typography>
        <Tabs
          value={selectedDivision}
          onChange={(e, v) => setSelectedDivision(v)}
          centered
        >
          {divisions.map((d, i) => (
            <Tab label={`CLASS ${formatClass(i)}`} key={i} />
          ))}
        </Tabs>

        <Box display="flex" justifyContent="center">
          <TournamentBoard
            nodes={divisions[selectedDivision] ?? []}
            contestResults={contestResults}
          />
        </Box>
      </Grid>
    </>
  );
};
