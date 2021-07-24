import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { GameNode } from "../components/GameNode/GameNode";
import { LeagueTable } from "../components/LeagueTable/LeagueTable";
import { User } from "../models/TournamentNode";
import { useTournament } from "../utils/API";

interface Props {
  seasonId: string;
}

const SingleWinnerTable = ({ top4 }: { top4?: { [_: number]: User[] } }) => {
  if (!top4) {
    return null;
  }
  return (
    <Container>
      {Object.entries(top4).map(([rank, users]) => {
        const variant = rank === "1" ? "h3" : rank === "2" ? "h4" : "h5";
        const title =
          rank === "1" ? "優勝" : rank === "2" ? "準優勝" : `${rank}位`;
        return (
          <Box m={2} key={rank}>
            <Typography variant={variant} align="center" color="textPrimary">
              {title}
            </Typography>
            {users.map((user) => (
              <Typography
                variant={variant}
                align="center"
                color="textPrimary"
                key={user.user_id}
              >
                {user.user_id}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Container>
  );
};
const AntTab = withStyles(() => ({
  root: {
    minWidth: 10,
  },
  selected: {},
}))(Tab);

export const Tournament = (props: Props) => {
  const tournament = useTournament(props.seasonId).data;
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [showTop16, setShowTop16] = useState(false);

  const keys = Object.keys(tournament ?? {});
  const bracket =
    keys[selectedDivision] && tournament
      ? tournament[keys[selectedDivision]]
      : null;

  const node = bracket?.node;
  const league = bracket?.league;
  const defendingChampion = bracket?.defending_champion;
  const depthLimit = showTop16 ? 4 : 100;
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
          variant="fullWidth"
          value={selectedDivision}
          onChange={(e, v) => setSelectedDivision(v)}
          centered
        >
          {keys.map((key, i) => (
            <AntTab label={`${key}`} key={i} />
          ))}
        </Tabs>
        {tournament ? (
          <>
            {keys[selectedDivision] && (
              <SingleWinnerTable
                top4={tournament[keys[selectedDivision]].top4}
              />
            )}
            <Button onClick={() => setShowTop16(!showTop16)}>
              {showTop16 ? "全て表示する" : "Top16のみ表示する"}
            </Button>
            <Box display="flex" justifyContent="center">
              {node && (
                <GameNode
                  tournament={node}
                  depth={0}
                  config={{ depthLimit, defendingChampion }}
                />
              )}
            </Box>
            {league && league.length > 0 && (
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Typography variant="h4" align="center" color="textPrimary">
                  順位決定リーグ
                </Typography>
                <LeagueTable
                  seasonId={props.seasonId}
                  league={league}
                  promotionRank={bracket?.promotion_rank}
                  dropRank={bracket?.drop_rank}
                />
              </Box>
            )}
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
};
