import React from "react";
import CreateDevice from "../../components/admin/CreateDevice";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  presentation: {
    background: theme.palette.primary.main,
  },
}));

function NewDevice() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={9} lg={10}>
        <Grid container className={classes.presentation}>
          <h3>New device</h3>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} lg={2}>
        <CreateDevice />
      </Grid>
    </div>
  );
}

export default NewDevice;
