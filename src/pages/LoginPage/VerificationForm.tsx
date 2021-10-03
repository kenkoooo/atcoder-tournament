import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
interface Props {
  code: string;
  onConfirm: () => void;
}
export const VerificationForm = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <p>本人確認のため、AtCoder にログインして、所属を一時的に</p>
      <code>{props.code}</code>
      <p>に変更して、「確認」ボタンを押してください。</p>
      <Button
        onClick={props.onConfirm}
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
