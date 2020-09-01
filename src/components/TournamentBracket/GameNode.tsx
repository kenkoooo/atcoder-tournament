import { Box, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BracketNode } from "../../models/BracketNode";
import {
  red,
  orange,
  yellow,
  blue,
  lightBlue,
  green,
  brown,
  grey,
} from "@material-ui/core/colors";
import "./tournament.scss";

const useStyle = makeStyles(() => ({
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
    color: blue[800],
  },
  lightBlue: {
    color: lightBlue[300],
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

  nodeText: {
    padding: "3px",
    margin: 0,
    backgroundColor: "#7a7b7d",
    textShadow: "rgb(34,34,34) 1px 1px 1px",
    fontSize: "14px",
    fontFamily: '"Roboto Light", sans-serif',
    borderWidth: 0,
    borderRadius: "3px",
    minWidth: "120px",
    textAlign: "center",
  },
  rankBadge: {
    marginLeft: "auto",
    fontSize: "10px",
  },
}));

const RatingName = (props: {
  children: string;
  rating: number | undefined;
}) => {
  const classes = useStyle();
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

const RankedRatingName = (props: { node: BracketNode }) => {
  const { node } = props;
  const classes = useStyle();
  switch (node.type) {
    case "Empty":
      return (
        <div className={classes.nodeText}>
          <p>...</p>
        </div>
      );
    case "WaitingUser":
      return (
        <div className={classes.nodeText}>
          <RatingName rating={node.rating}>{node.name}</RatingName>
        </div>
      );
    case "AbsentUser":
      return (
        <Box
          display="flex"
          justifyContent="center"
          className={classes.nodeText}
        >
          <div>
            <RatingName rating={node.rating}>{node.name}</RatingName>
          </div>
          <Box display="flex" alignItems="center" className={classes.rankBadge}>
            -
          </Box>
        </Box>
      );
    case "ParticipatedUser":
      return (
        <Box
          display="flex"
          justifyContent="center"
          className={classes.nodeText}
        >
          <div>
            <RatingName rating={node.rating}>{node.name}</RatingName>
          </div>
          <Box display="flex" alignItems="center" className={classes.rankBadge}>
            {node.rank}
          </Box>
        </Box>
      );
  }
};

interface Props {
  node: BracketNode;
}

export const GameNode = (props: Props) => {
  if (props.node.children.length === 0) {
    return <RankedRatingName node={props.node} />;
  } else {
    return (
      <div className="item">
        <div className="item-parent">
          <RankedRatingName node={props.node} />
        </div>
        <div className="item-children">
          {props.node.children.map((child, i) => (
            <div key={i} className="item-child">
              <GameNode node={child} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
