import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TournamentNode } from "../../models/TournamentNode";
import { RankedRatingName } from "./RankedRatingName";

const SIDE_MARGIN = "60px";
const BORDER = "3px";
const NODE_PADDING = "3px";
const VERTICAL_MARGIN = "1px";

const useStyle = makeStyles(() => ({
  item: {
    display: "flex",
    flexDirection: "row-reverse",

    "& p": {
      padding: NODE_PADDING,
      margin: 0,
      textShadow: "rgb(34, 34, 34) 1px 1px 1px",
      fontSize: "14px",
      fontFamily: '"Roboto Light", sans-serif',
      borderWidth: 0,
      borderRadius: NODE_PADDING,
      minWidth: "100px",
      textAlign: "center",
    },
  },

  itemChildren: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  itemChild: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: VERTICAL_MARGIN,
    marginBottom: VERTICAL_MARGIN,
    position: "relative",

    "&:before": {
      content: '""',
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",

      right: 0,
      transform: "translateX(100%)",
      width: `calc(${SIDE_MARGIN} / 2)`,
      height: BORDER,
    },

    "&:after": {
      content: '""',
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",

      right: `calc(-${SIDE_MARGIN} / 2)`,
      height: `calc(50% + ${VERTICAL_MARGIN} * 2)`,
      width: BORDER,
    },

    "&:last-child": {
      "&:after": {
        transform: "translateY(-100%)",
      },
    },

    "&:only-child:after": {
      display: "none",
    },
  },

  itemParent: {
    position: "relative",
    marginLeft: SIDE_MARGIN,
    display: "flex",
    alignItems: "center",

    "&:after": {
      position: "absolute",
      content: '""',
      width: `calc(${SIDE_MARGIN} / 2)`,
      height: BORDER,
      left: 0,
      top: "50%",
      backgroundColor: "#fff",
      transform: "translateX(-100%)",
    },
  },
}));

interface Props {
  tournament: TournamentNode;
  promotedUser?: string;
}

export const GameNode = (props: Props) => {
  const classes = useStyle();
  const promotedUser = props.tournament.user?.user_id;
  if (props.tournament.children.length === 0) {
    return (
      <RankedRatingName
        user={props.tournament.user}
        rank={props.tournament.rank}
        winner={
          props.promotedUser !== undefined &&
          props.tournament.user?.user_id === props.promotedUser
        }
      />
    );
  } else {
    return (
      <div className={classes.item}>
        <div className={classes.itemParent}>
          <RankedRatingName
            user={props.tournament.user}
            rank={props.tournament.rank}
            winner={
              props.promotedUser !== undefined &&
              props.tournament.user?.user_id === props.promotedUser
            }
          />
        </div>
        <div className={classes.itemChildren}>
          {props.tournament.children.map((child, i) => (
            <div key={i} className={classes.itemChild}>
              <GameNode tournament={child} promotedUser={promotedUser} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
