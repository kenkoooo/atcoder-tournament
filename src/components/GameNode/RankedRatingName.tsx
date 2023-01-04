import { Box, Tooltip } from "@material-ui/core";
import { grey, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useParams } from "react-router-dom";
import { User } from "../../models/TournamentNode";
import { UserHistory } from "../../models/UserHistory";
import { INF_RANK } from "../../utils/Constants";
import { RatingName } from "../RatingName";

interface Props {
  user: User | null;
  rank: number | null;
  winner?: boolean;
  defendingChampion?: boolean;
  histories: UserHistory["histories"];
}

const useStyle = makeStyles({
  nodeBox: {
    textShadow: "rgb(34,34,34) 1px 1px 1px",
    fontFamily: '"Roboto Light", sans-serif',
    borderWidth: 0,
    borderRadius: "3px",
    fontSize: "12px",
    minWidth: "120px",
    minHeight: "24px",
    backgroundColor: grey[800],
  },
  nameContainer: {
    padding: "3px",
    margin: 0,
    textAlign: "center",
  },
  rankContainer: {
    padding: "3px",
    borderWidth: 0,
    borderRadius: "3px",
    marginLeft: "auto",
    fontSize: "10px",
    minWidth: "24px",
    backgroundColor: (props: { winner?: boolean }) =>
      props.winner ? orange[500] : grey[400],
  },
  nodeText: {
    padding: "3px",
    margin: 0,
    textAlign: "center",
  },
  rankText: {
    color: "black",
    textAlign: "center",
    textShadow: "none",
  },
});

const WinnerTooltip = (props: {
  defendingChampion: boolean | undefined;
  histories: UserHistory["histories"];
  seasonId: string;
}) => {
  if (props.defendingChampion) {
    return (
      <Tooltip title="前期王者">
        <span role="img" aria-label="king">
          &#x1F451;{" "}
        </span>
      </Tooltip>
    );
  }

  const pastA1 = Object.entries(props.histories).filter(
    ([seasonId, history]) =>
      parseInt(seasonId) < parseInt(props.seasonId) &&
      (history.class === "A" || history.class === "A1")
  );

  const pastWonRounds = pastA1
    .filter(([, history]) => history.top_k === 1)
    .map(([seasonId]) => parseInt(seasonId))
    .sort();

  if (pastWonRounds.length > 0) {
    const label = pastWonRounds.map((round) => `${round}期`).join("・");
    return (
      <Tooltip title={`第${label}王者`}>
        <span role="img" aria-label="gold">
          &#x1F3C6;{" "}
        </span>
      </Tooltip>
    );
  }

  const pastSilver = pastA1.filter(([, history]) => history.top_k === 2);
  if (pastSilver.length > 0) {
    return (
      <Tooltip title="A1準優勝経験者">
        <span role="img" aria-label="silver">
          &#x1F948;{" "}
        </span>
      </Tooltip>
    );
  }

  const pastBronze = pastA1.filter(([, history]) => history.top_k === 4);
  if (pastBronze.length > 0) {
    return (
      <Tooltip title="A1準決勝経験者">
        <span role="img" aria-label="bronze">
          &#x1F949;{" "}
        </span>
      </Tooltip>
    );
  }
  return null;
};

export const RankedRatingName = (props: Props) => {
  const { user, rank, winner, histories } = props;
  const { seasonId } = useParams<{ seasonId: string }>();
  const classes = useStyle({ winner });

  if (!user) {
    return (
      <div className={classes.nodeBox}>
        <p>...</p>
      </div>
    );
  }

  const nameElement = (
    <div className={classes.nameContainer}>
      <WinnerTooltip
        defendingChampion={props.defendingChampion}
        histories={histories}
        seasonId={seasonId}
      />
      <RatingName rating={user.rating}>{user.user_id}</RatingName>
    </div>
  );

  if (!rank) {
    return <div className={classes.nodeBox}>{nameElement}</div>;
  }

  const rankText = rank >= INF_RANK ? "-" : rank;
  return (
    <Box display="flex" justifyContent="center" className={classes.nodeBox}>
      {nameElement}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.rankContainer}
      >
        <div className={classes.rankText}>{rankText}</div>
      </Box>
    </Box>
  );
};
