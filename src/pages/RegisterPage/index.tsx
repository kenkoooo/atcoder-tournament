import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const RegistrationForm = (props: {
  state: InputState;
  onChange: (input: InputState) => void;
  register: (input: InputState) => void;
}) => {
  const classes = useStyles();
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        props.register(props.state);
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="AtCoder ID"
        autoFocus
        value={props.state.userId}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (/^[a-zA-Z0-9\-_]*$/.test(inputValue)) {
            props.onChange({
              ...props.state,
              userId: inputValue,
            });
          }
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={props.state.userId.length === 0}
      >
        登録
      </Button>
    </form>
  );
};

const VerificationForm = (props: {
  state: VerifyState;
  confirm: () => void;
}) => {
  const classes = useStyles();
  return (
    <>
      <p>本人確認のため、AtCoder にログインして、所属を一時的に</p>
      <code>{props.state.code}</code>
      <p>に変更して、「確認」ボタンを押してください。</p>
      <Button
        onClick={props.confirm}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        確認
      </Button>
    </>
  );
};

interface InputState {
  type: "Input";
  userId: string;
}
interface VerifyState {
  type: "Verify";
  userId: string;
  secret: string;
  code: string;
}
interface RegisteredState {
  type: "Registered";
}
interface FailedState {
  type: "Failed";
}
interface PendingState {
  type: "Pending";
}

type RegisterState =
  | InputState
  | VerifyState
  | RegisteredState
  | FailedState
  | PendingState;

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

export const RegisterPage = () => {
  const classes = useStyles();
  const [registerState, setRegisterState] = useState<RegisterState>({
    type: "Input",
    userId: "",
  });

  const getVerificationCode = (input: InputState) => {
    setRegisterState({ type: "Pending" });
    fetch("https://atcoder-auth.kenkoooo.com/api/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: input.userId.trim() }),
    })
      .then((response) => response.json())
      .then((response) => {
        setRegisterState({
          type: "Verify",
          userId: input.userId,
          secret: response.secret,
          code: response.verification_code,
        });
      })
      .catch(() => {
        setRegisterState({
          type: "Failed",
        });
      });
  };
  const confirmRegistration = (verify: VerifyState) => {
    setRegisterState({ type: "Pending" });
    fetch("https://atcoder-auth.kenkoooo.com/api/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: verify.userId, secret: verify.secret }),
    })
      .then((response) => response.json())
      .then((response) => {
        const token = response.token;
        return fetch("https://atcoder-tournament.herokuapp.com/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `user_id=${verify.userId}&token=${token}`,
        });
      })
      .then(() => {
        setRegisterState({ type: "Registered" });
      })
      .catch(() => {
        setRegisterState({
          type: "Failed",
        });
      });
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          第6期
        </Typography>
        <Typography component="h1" variant="h5">
          ABCトーナメント参加登録
        </Typography>
        {/*<Typography component="h3" variant="h6">*/}
        {/*  2021-07-24(土) 20:30〆切*/}
        {/*</Typography>*/}
        {registerState.type === "Input" && (
          <RegistrationForm
            state={registerState}
            onChange={setRegisterState}
            register={getVerificationCode}
          />
        )}
        {registerState.type === "Verify" && (
          <VerificationForm
            state={registerState}
            confirm={() => confirmRegistration(registerState)}
          />
        )}
        {registerState.type === "Failed" && (
          <>
            <p>登録に失敗しました。本人確認に失敗したか、既に登録済みです。</p>
          </>
        )}
        {registerState.type === "Registered" && <p>登録完了しました。</p>}
        {registerState.type === "Pending" && <CircularProgress />}
      </div>
    </Container>
  );
};
