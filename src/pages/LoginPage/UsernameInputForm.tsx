import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {
  onSubmit: (username: string) => void;
}

export const UsernameInputForm = (props: Props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(username);
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="AtCoder ID"
        autoFocus
        value={username}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (/^[a-zA-Z0-9\-_]*$/.test(inputValue)) {
            setUsername(inputValue);
          }
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={username.length === 0}
      >
        ログイン
      </Button>
    </form>
  );
};
