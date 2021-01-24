import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { RatingName } from "../components/RatingName";

export const UserListPage = () => {
  const [ratingMap, setRatingMap] = useState<Map<string, number>>(new Map());
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    fetch("./ratings.json")
      .then((r) => r.json())
      .then((r) => r as { user_id: string; rating: number }[])
      .then((ratings) => {
        const map = new Map<string, number>();
        ratings.forEach(({ user_id, rating }) => {
          map.set(user_id, rating);
        });
        setRatingMap(map);
      });
  }, []);
  useEffect(() => {
    fetch("https://atcoder-tournament.herokuapp.com/api/users")
      .then((r) => r.json())
      .then((r) => r as string[])
      .then((r) => setUsers(r));
  }, []);
  const registeredUsers = users.map((userId) => {
    const rating = ratingMap.get(userId) ?? 0;
    return { rating, userId };
  });
  registeredUsers.sort((a, b) => b.rating - a.rating);
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Grid container justify="center" direction="column">
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          display="inline"
          noWrap
        >
          第3期ABCトーナメント
        </Typography>
        <Typography component="h2" variant="h5" align="center">
          2021/01/30 19:00 JST 〆切
        </Typography>
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          display="inline"
          noWrap
        >
          <Button component={RouterLink} to="/register">
            登録
          </Button>
        </Typography>
        {registeredUsers.map(({ userId, rating }) => {
          return (
            <Typography
              key={userId}
              variant="h6"
              align="center"
              color="textPrimary"
              display="inline"
              noWrap
            >
              <RatingName rating={rating}>{userId}</RatingName>
            </Typography>
          );
        })}
      </Grid>
    </Container>
  );
};
