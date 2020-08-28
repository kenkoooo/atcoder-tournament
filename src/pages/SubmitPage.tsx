import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";
import { SEASON_ID } from "../utils/Constants";

type RegisterState = "Registered" | "Input" | "Failed";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SubmitPage = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [registerState, setRegisterState] = useState<RegisterState>("Input");

  const register = () => {
    fetch("https://atcoder-tournament.herokuapp.com/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `atcoder_id=${userId}&season_id=${SEASON_ID}`,
    })
      .then(() => {
        setRegisterState("Registered");
      })
      .catch(() => {
        setRegisterState("Failed");
      });
  };

  if (registerState === "Registered") {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="AtCoder ID"
            autoFocus
            value={userId}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^[a-zA-Z0-9\-_]*$/.test(inputValue)) {
                setUserId(inputValue);
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={userId.length === 0}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};
