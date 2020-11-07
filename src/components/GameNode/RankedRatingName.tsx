import { Box, Link } from "@material-ui/core";
import {
  blue,
  brown,
  green,
  grey,
  lightBlue,
  orange,
  red,
  yellow,
} from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { User } from "../../models/TournamentNode";

const useRatingColorStyle = makeStyles(() => ({
  red: {
    color: red[500],
  },
  orange: {
    color: orange[500],
  },
  yellow: {
    color: yellow[500],
  },
  blue: {
    color: blue[600],
  },
  lightBlue: {
    color: lightBlue[200],
  },
  green: {
    color: green[400],
  },
  brown: {
    color: brown[400],
  },
  grey: {
    color: grey[500],
  },
}));

const RatingName = (props: {
  children: string;
  rating: number | undefined;
}) => {
  const classes = useRatingColorStyle();
  const userId = props.children;
  const rating = props.rating;
  if (!rating) {
    return <p>{userId}</p>;
  }
  let c: string;
  if (rating < 400) {
    c = classes.grey;
  } else if (rating < 800) {
    c = classes.brown;
  } else if (rating < 1200) {
    c = classes.green;
  } else if (rating < 1600) {
    c = classes.lightBlue;
  } else if (rating < 2000) {
    c = classes.blue;
  } else if (rating < 2400) {
    c = classes.yellow;
  } else if (rating < 2800) {
    c = classes.orange;
  } else {
    c = classes.red;
  }
  const screenUserId =
    userId.length <= 13 ? userId : userId.slice(0, 10) + "...";
  return (
    <Link className={c} href={`https://atcoder.jp/users/${userId}`}>
      {screenUserId}
    </Link>
  );
};

interface Props {
  user: User | null;
  rank: number | null;
  winner?: boolean;
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
  if (!rank) {
    return (
      <div className={classes.nodeBox}>
        <div className={classes.nameContainer}>
          <RatingName rating={user.rating}>{user.user_id}</RatingName>
        </div>
      </div>
    );
  }

  const rankText = rank > 100000 ? "-" : rank;
  return (
    <Box display="flex" justifyContent="center" className={classes.nodeBox}>
      <div className={classes.nameContainer}>
        <RatingName rating={user.rating}>{user.user_id}</RatingName>
      </div>
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
