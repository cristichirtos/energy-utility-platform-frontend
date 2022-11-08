import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import BasicTable from "../../components/utils/BasicTable";

const useStyles = makeStyles((theme) => ({
  presentation: {
    background: theme.palette.primary.secondary,
  },
}));

function Devices() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Devices:
      <Grid container>
        <Grid item xs={12} md={9} lg={10}>
          <Grid container className={classes.presentation}>
            <BasicTable entity='devices'/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Devices;
