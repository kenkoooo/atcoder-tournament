import { Link } from "@material-ui/core";
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
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DUMMY_USER_ID_PREFIX } from "../utils/Constants";

const useRatingColorStyle = makeStyles(() => ({
  red: {
    fontWeight: "bold",
    color: red[500],
  },
  orange: {
    fontWeight: "bold",
    color: orange[500],
  },
  yellow: {
    fontWeight: "bold",
    color: yellow[500],
  },
  blue: {
    fontWeight: "bold",
    color: blue[600],
  },
  lightBlue: {
    fontWeight: "bold",
    color: lightBlue[200],
  },
  green: {
    fontWeight: "bold",
    color: green[600],
  },
  brown: {
    fontWeight: "bold",
    color: brown[400],
  },
  grey: {
    fontWeight: "bold",
    color: grey[500],
  },
}));
export const RatingName = (props: {
  children: string;
  rating: number | undefined;
}) => {
  const classes = useRatingColorStyle();
  const userId = props.children;
  const rating = props.rating;
  if (userId.startsWith(DUMMY_USER_ID_PREFIX)) {
    return <>-</>;
  }
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
    <Link className={c} component={RouterLink} to={`/user/${userId}`}>
      {screenUserId}
    </Link>
  );
};
