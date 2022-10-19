import React from "react";
import CreateClient from "../components/admin/CreateClient";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loginForm: {
    alignContent: "centre",
    justifyItems: "flex-end",
    alignSelf: "centre",
  },
  presentation: {
    background: theme.palette.primary.main,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={9} lg={10}>
          <Grid container className={classes.presentation}>
            <h1>Register</h1>
          </Grid>
        </Grid>
        <Grid item className={classes.loginForm} xs={12} md={3} lg={2}>
          <CreateClient />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
