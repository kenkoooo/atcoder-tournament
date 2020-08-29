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

const RankedRatingName = (props: {
  node: BracketNode;
  rating: number | undefined;
}) => {
  const { node, rating } = props;
  const classes = useStyle();
  return node.rank ? (
    <Box display="flex" justifyContent="center" className={classes.nodeText}>
      <div>
        <RatingName rating={rating}>{node.name}</RatingName>
      </div>
      <Box display="flex" alignItems="center" className={classes.rankBadge}>
        {node.rank}
      </Box>
    </Box>
  ) : (
    <div className={classes.nodeText}>
      <RatingName rating={rating}>{node.name}</RatingName>
    </div>
  );
};

interface Props {
  node: BracketNode;
  getRating: (userId: string) => number | undefined;
}

export const GameNode = (props: Props) => {
  const { node, getRating } = props;
  const rating = getRating(node.name);

  if (node.children.length === 0) {
    return <RankedRatingName node={node} rating={rating} />;
  } else {
    return (
      <div className="item">
        <div className="item-parent">
          <RankedRatingName node={node} rating={rating} />
        </div>
        <div className="item-children">
          {node.children.map((node, i) => (
            <div key={i} className="item-child">
              <GameNode getRating={getRating} node={node} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
