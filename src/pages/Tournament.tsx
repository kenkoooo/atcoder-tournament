import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { TournamentBoard } from "../components/TournamentBoard";
import {
  fetchContestResults,
  fetchOrderedUserList,
  fetchRatingMap,
} from "../utils/API";
import "./tournament.scss";
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

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

interface Props {
  seasonId: string;
}

export const Tournament = (props: Props) => {
  const classes = useStyles();
  const [atCoderUserIds, setAtCoderUserIds] = useState<string[]>([]);
  const [ratingMap, setRatingMap] = useState<Map<string, number> | undefined>(
    undefined
  );
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
    if (!ratingMap) {
      fetchRatingMap().then((map) => setRatingMap(map));
    }
    if (!contestResults) {
      fetchContestResults().then((maps) => setContestResults(maps));
    }
  });

  const divisionCount = Math.ceil(atCoderUserIds.length / MAXIMUM_MEMBER);
  const divisionMembers = Math.ceil(
    atCoderUserIds.length / Math.max(divisionCount, 1)
  );

  const divisions = [] as string[][];
  let i = atCoderUserIds.length - 1;
  while (i >= 0) {
    const division = [] as string[];
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
            atCoderUserIds={divisions[selectedDivision] ?? []}
            ratingMap={ratingMap}
            contestResults={contestResults}
          />
        </Box>
      </Grid>
    </>
  );
};
