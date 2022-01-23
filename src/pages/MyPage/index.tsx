import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  saveUserData,
  useLoginState,
  useUserData,
} from "../../utils/PrivateAPI";

const REGISTER_SEASON_ID = 9;

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <CircularProgress />
      </div>
    </Container>
  );
};

export const MyPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const loginState = useLoginState();
  const userData = useUserData();
  const [isSaving, setSaving] = useState(false);

  const [participateNext, setParticipateNext] = useState(false);
  useEffect(() => {
    if (userData.data?.participate_next) {
      setParticipateNext(true);
    }
  }, [userData.data]);

  const [participateForever, setParticipateForever] = useState(false);
  useEffect(() => {
    if (userData.data?.participate_forever) {
      setParticipateForever(true);
    }
  }, [userData.data]);

  if (!loginState.data && !loginState.error) {
    return <Spinner />;
  }
  if (!loginState.data) {
    history.push({ pathname: "/login" });
    return <div />;
  }

  if (!userData.data && !userData.error) {
    return <Spinner />;
  }

  const userId = loginState.data;
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}></div>
      <Typography component="h1" variant="h5">
        {userId}
      </Typography>
      <Typography component="h2" variant="h5">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={participateNext}
                onChange={() => setParticipateNext(!participateNext)}
              />
            }
            label={`第${REGISTER_SEASON_ID}期トーナメントに参加する`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={participateForever}
                onChange={() => setParticipateForever(!participateForever)}
              />
            }
            label={`第${REGISTER_SEASON_ID + 1}期以降も参加する`}
          />
        </FormGroup>
      </Typography>
      {isSaving ? (
        <Spinner />
      ) : (
        <Button
          onClick={async () => {
            setSaving(true);
            await saveUserData({
              participate_next: participateNext,
              participate_forever: participateForever,
            });
            await userData.revalidate();
            setSaving(false);
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          設定を保存
        </Button>
      )}
    </Container>
  );
};
