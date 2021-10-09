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
import { signupUser, stageUser, useLoginState } from "../../utils/PrivateAPI";
import { UsernameInputForm } from "./UsernameInputForm";
import { VerificationForm } from "./VerificationForm";
import { useHistory } from "react-router-dom";

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
    }
  | {
      type: "failed";
    }
  | {
      type: "verification_finished";
    };

export const LoginPage = () => {
  const classes = useStyles();
  const [loginPageState, setLoginPageState] = useState<LoginPageState>({
    type: "input",
  });
  const loginState = useLoginState();
  const history = useHistory();

  if (!loginState.error && !loginState.data) {
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (loginState.data) {
    history.push({ pathname: "/mypage" });
    return <div />;
  }

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
              const signupSucceeded = await signupUser(loginPageState.userId);
              if (signupSucceeded) {
                await loginState.revalidate();
                setLoginPageState({ type: "verification_finished" });
              } else {
                setLoginPageState({ type: "failed" });
              }
            }}
          />
        )}
        {loginPageState.type === "failed" && <p>認証に失敗しました。</p>}
        {loginPageState.type === "verification_finished" &&
          loginState.error && (
            <p>
              ログイン情報の保存に失敗しました。サードパーティのCookieを許可するように、ブラウザの設定を変更してみてください。
            </p>
          )}
      </div>
    </Container>
  );
};
