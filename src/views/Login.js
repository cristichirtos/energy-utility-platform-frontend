import React from "react";
import Login from "../components/auth/Login";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  presentation: {
    background: theme.palette.primary.main,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={9} lg={10}>
        <Grid container className={classes.presentation}>
          <h1>Log in</h1>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} lg={2}>
        <Login />
      </Grid>
    </div>
  );
}

export default Home;
