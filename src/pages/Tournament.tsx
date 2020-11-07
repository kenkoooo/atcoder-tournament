import {
  Box,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GameNode } from "../components/GameNode/GameNode";
import { TournamentResponse } from "../models/TournamentNode";
import { fetchTournament } from "../utils/API";

interface Props {
  seasonId: string;
}

export const Tournament = (props: Props) => {
  const [tournament, setTournament] = useState<TournamentResponse>({});
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
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
          第1期
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

        <Box display="flex" justifyContent="center">
          {keys[selectedDivision] && (
            <GameNode tournament={tournament[keys[selectedDivision]]} />
          )}
        </Box>
      </Grid>
    </>
  );
};
