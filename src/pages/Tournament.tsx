import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GameNode } from "../components/GameNode/GameNode";
import { TournamentResponse, User } from "../models/TournamentNode";
import { fetchTournament } from "../utils/API";

interface Props {
  seasonId: string;
}

const SingleWinnerTable = (props: { users: User[] | null | undefined }) => {
  const { users } = props;
  if (!users || users.length < 4) {
    return null;
  }
  return (
    <Container>
      <Box m={2}>
        <Typography variant="h3" align="center" color="textPrimary">
          優勝
        </Typography>
        <Typography variant="h3" align="center" color="textPrimary">
          {users[0].user_id}
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h4" align="center" color="textPrimary">
          準優勝
        </Typography>
        <Typography variant="h4" align="center" color="textPrimary">
          {users[1].user_id}
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5" align="center" color="textPrimary">
          3位タイ
        </Typography>
        <Typography variant="h5" align="center" color="textPrimary">
          {users[2].user_id}
        </Typography>
        <Typography variant="h5" align="center" color="textPrimary">
          {users[3].user_id}
        </Typography>
      </Box>
    </Container>
  );
};

export const Tournament = (props: Props) => {
  const [tournament, setTournament] = useState<TournamentResponse>({});
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [showTop16, setShowTop16] = useState(false);
  const keys = Object.keys(tournament);

  useEffect(() => {
    fetchTournament(props.seasonId).then((response) => {
      setTournament(response);
    });
  }, [props.seasonId]);

  return (
    <>
      <CssBaseline />
      <Grid container justify="center" direction="column">
        <Typography variant="h4" align="center" color="textPrimary">
          第{props.seasonId}期
        </Typography>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          display="inline"
          noWrap
        >
          AtCoder Beginner Contest Tournament
        </Typography>
        <Tabs
          value={selectedDivision}
          onChange={(e, v) => setSelectedDivision(v)}
          centered
        >
          {keys.map((key, i) => (
            <Tab label={`CLASS ${key}`} key={i} />
          ))}
        </Tabs>
        {keys[selectedDivision] && (
          <SingleWinnerTable users={tournament[keys[selectedDivision]].top4} />
        )}
        <Button onClick={() => setShowTop16(!showTop16)}>
          {showTop16 ? "全て表示する" : "Top16のみ表示する"}
        </Button>
        <Box display="flex" justifyContent="center">
          {keys[selectedDivision] && (
            <GameNode
              tournament={tournament[keys[selectedDivision]].node}
              depth={0}
              depthLimit={showTop16 ? 4 : 100}
            />
          )}
        </Box>
      </Grid>
    </>
  );
};
