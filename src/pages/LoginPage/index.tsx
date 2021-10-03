import {
  Avatar,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { signupUser, stageUser, verifyUser } from "./LoginAPI";
import { UsernameInputForm } from "./UsernameInputForm";
import { VerificationForm } from "./VerificationForm";

interface Props {}

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
}));

type LoginPageState =
  | {
      type: "input";
    }
  | {
      type: "staging";
    }
  | {
      type: "pending";
    }
  | {
      type: "verify";
      token: string;
      userId: string;
    };

export const LoginPage = (props: Props) => {
  const classes = useStyles();
  const [loginPageState, setLoginPageState] = useState<LoginPageState>({
    type: "input",
  });
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ABCトーナメント参加登録ページ
        </Typography>
        {loginPageState.type === "pending" && <CircularProgress />}
        {loginPageState.type === "input" && (
          <UsernameInputForm
            onSubmit={async (userId) => {
              setLoginPageState({ type: "pending" });
              const token = await stageUser(userId);
              setLoginPageState({ type: "verify", token, userId });
            }}
          />
        )}
        {loginPageState.type === "verify" && (
          <VerificationForm
            code={loginPageState.token}
            onConfirm={async () => {
              setLoginPageState({ type: "pending" });
              const signupResult = await signupUser(loginPageState.userId);
              await verifyUser();
            }}
          />
        )}
      </div>
    </Container>
  );
};
