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
    color: blue[500],
  },
  lightBlue: {
    color: lightBlue[500],
  },
  green: {
    color: green[500],
  },
  brown: {
    color: brown[500],
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
  if (!rating || rating < 400) {
    return <p>{props.children}</p>;
  } else if (rating < 800) {
    return <p className={classes.brown}>{props.children}</p>;
  } else if (rating < 1200) {
    return <p className={classes.green}>{props.children}</p>;
  } else if (rating < 1600) {
    return <p className={classes.lightBlue}>{props.children}</p>;
  } else if (rating < 2000) {
    return <p className={classes.blue}>{props.children}</p>;
  } else if (rating < 2400) {
    return <p className={classes.yellow}>{props.children}</p>;
  } else if (rating < 2800) {
    return <p className={classes.orange}>{props.children}</p>;
  }
  return <p className={classes.red}>{props.children}</p>;
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
