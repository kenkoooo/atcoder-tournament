import {
  AppBar,
  Container,
  createMuiTheme,
  CssBaseline,
  Link,
  MuiThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  HashRouter,
  Link as RouterLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { Tournament } from "./pages/Tournament";
import { TournamentListPage } from "./pages/TournamentListPage";
import { TournamentRankingPage } from "./pages/TournamentRankingPage";
import { UserHistoryPage } from "./pages/UserHistoryPage";
import { SEASON_ID } from "./utils/Constants";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: "none",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="relative"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              component={RouterLink}
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
              to="/"
            >
              ABC トーナメント
            </Typography>
            <nav>
              <Link
                component={RouterLink}
                variant="button"
                color="textPrimary"
                to="/tournament/5"
                className={classes.link}
              >
                第5期
              </Link>
              <Link
                component={RouterLink}
                variant="button"
                color="textPrimary"
                to="/tournament/4"
                className={classes.link}
              >
                第4期
              </Link>
              <Link
                component={RouterLink}
                variant="button"
                color="textPrimary"
                to="/tournament/3"
                className={classes.link}
              >
                第3期
              </Link>
              <Link
                component={RouterLink}
                variant="button"
                color="textPrimary"
                to="/past"
                className={classes.link}
              >
                過去の開催
              </Link>
              <Link
                component={RouterLink}
                variant="button"
                color="textPrimary"
                to="/register"
                className={classes.link}
              >
                参加登録
              </Link>
              <Link
                href="https://github.com/kenkoooo/atcoder-tournament/tree/master/rules"
                target="_blank"
                rel="noopener noreferrer"
                variant="button"
                color="textPrimary"
                className={classes.link}
              >
                ルール
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth={false}>
          <Switch>
            <Route
              exact
              path="/tournament/:id([0-9]+)"
              render={({ match }) => {
                const seasonId: string | undefined = match.params.id;
                return (
                  <Tournament seasonId={seasonId ?? SEASON_ID.toString()} />
                );
              }}
            />
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/user/:user_id([0-9a-zA-Z_]+)">
              <UserHistoryPage />
            </Route>
            <Route path="/past">
              <TournamentListPage />
            </Route>
            <Route path="/ranking/:seasonId([0-9]+)">
              <TournamentRankingPage />
            </Route>
            <Redirect path="/" to={`/tournament/${SEASON_ID}`} />
          </Switch>
        </Container>
      </MuiThemeProvider>
    </HashRouter>
  );
};

export default App;
