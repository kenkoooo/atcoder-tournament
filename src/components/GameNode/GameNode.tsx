import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import { TournamentNode } from "../../models/TournamentNode";
import { UserHistory } from "../../models/UserHistory";
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
      // height: `calc(75% + ${VERTICAL_MARGIN} * 2)`,
      height: `calc(50% + ${VERTICAL_MARGIN} * 2)`,
      width: BORDER,
    },

    "&:not(:last-child):not(:first-child)": {
      "&:after": {
        transform: "translateY(-50%) scaleY(2)",
      },
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
  depth: number;
  config: {
    depthLimit: number;
    defendingChampion?: string;
  };
  histories: Map<string, UserHistory>;
}

export const GameNode = (props: Props) => {
  const { tournament, depth, config, promotedUser, histories } = props;
  const classes = useStyle();
  const nextPromotedUser = tournament.user?.user_id;
  const userHistory = useMemo(() => {
    if (tournament.user?.user_id) {
      return histories.get(tournament.user.user_id);
    }
  }, [tournament, histories]);
  if (tournament.children.length === 0 || config.depthLimit <= depth) {
    return (
      <RankedRatingName
        user={tournament.user}
        rank={tournament.rank}
        histories={userHistory?.histories ?? {}}
        defendingChampion={
          tournament.user?.user_id === config.defendingChampion
        }
        winner={
          promotedUser !== undefined &&
          tournament.user?.user_id === promotedUser
        }
      />
    );
  } else {
    return (
      <div className={classes.item}>
        <div className={classes.itemParent}>
          <RankedRatingName
            user={tournament.user}
            rank={tournament.rank}
            histories={userHistory?.histories ?? {}}
            defendingChampion={
              tournament.user?.user_id === config.defendingChampion
            }
            winner={
              promotedUser !== undefined &&
              tournament.user?.user_id === promotedUser
            }
          />
        </div>
        <div className={classes.itemChildren}>
          {tournament.children.map((child, i) => (
            <div key={i} className={classes.itemChild}>
              <GameNode
                tournament={child}
                promotedUser={nextPromotedUser}
                depth={depth + 1}
                config={config}
                histories={histories}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
