import { Box, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { User } from "../../models/TournamentNode";
import { RatingName } from "../RatingName";

interface Props {
  user: User | null;
  rank: number | null;
  winner?: boolean;
  defendingChampion?: boolean;
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
    backgroundColor: "#595a5e",
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
      props.winner ? "#f58540" : "#828489",
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

export const RankedRatingName = (props: Props) => {
  const { user, rank, winner } = props;
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
      {props.defendingChampion ? (
        <Tooltip title="前回優勝者">
          <span role="img" aria-label="king">
            👑{" "}
          </span>
        </Tooltip>
      ) : null}
      <RatingName rating={user.rating}>{user.user_id}</RatingName>
    </div>
  );

  if (!rank) {
    return <div className={classes.nodeBox}>{nameElement}</div>;
  }

  const rankText = rank > 100000 ? "-" : rank;
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
