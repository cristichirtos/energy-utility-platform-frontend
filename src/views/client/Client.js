import React from "react";
// CSS
import { Grid, makeStyles } from "@material-ui/core";
import BasicTable from "../../components/utils/BasicTable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  presentation: {
    background: theme.palette.primary.secondary,
  },
}));

function Client() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Your devices:
      <Grid container>
        <Grid item xs={12} md={9} lg={10}>
          <Grid container className={classes.presentation}>
            <BasicTable/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Client;
