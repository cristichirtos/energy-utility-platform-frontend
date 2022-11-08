import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  presentation: {
    background: theme.palette.primary.secondary,
  },
}));

function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Welcome to the admin dashboard! Click the buttons below to perform actions.
      <div>
        <Button color="primary" variant="contained" href="/admin/users">View users</Button>
        <Button color="primary" variant="contained" href="/admin/new-user">Create new user</Button>
        <Button color="primary" variant="contained" href="/admin/devices">View devices</Button>
        <Button color="primary" variant="contained" href="/admin/new-device">Create new device</Button>
      </div>
    </div>
  );
}

export default Admin;
