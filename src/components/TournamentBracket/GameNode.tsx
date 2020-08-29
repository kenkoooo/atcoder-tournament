import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BracketNode } from "./index";
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
}));

const RatingName = (props: {
  children: string;
  getRating: (userId: string) => number | undefined;
}) => {
  const classes = useStyle();
  const rating = props.getRating(props.children);
  if (!rating) {
    return <p>{props.children}</p>;
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
  return (
    <p>
      <Link className={c} href={`https://atcoder.jp/users/${props.children}`}>
        {props.children}
      </Link>
    </p>
  );
};

interface Props {
  node: BracketNode;
  getRating: (userId: string) => number | undefined;
}

export const GameNode = (props: Props) => {
  if (props.node.children.length === 0) {
    return (
      <RatingName getRating={props.getRating}>{props.node.name}</RatingName>
    );
  } else {
    return (
      <div className="item">
        <div className="item-parent">
          <RatingName getRating={props.getRating}>{props.node.name}</RatingName>
        </div>
        <div className="item-children">
          {props.node.children.map((node, i) => (
            <div key={i} className="item-child">
              <GameNode getRating={props.getRating} node={node} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
