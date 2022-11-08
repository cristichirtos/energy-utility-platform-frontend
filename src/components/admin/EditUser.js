import React from 'react'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UpdateUser, DestroyUserById } from '../../api/services/users';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
  },
}));

function EditClient({user}) {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  
  useEffect(() => {
    setUsername(user.username);
    setName(user.name);
  }, [user]);

  async function save(event) {
    event.preventDefault();
    const res = await UpdateUser(
      {
        id: user.id,
        username: username,
        name: name
      }
    )      

    if (res === 500){
      alert("Did not work");
    } else{
      if(res){
        alert("Update successful!");
      }
    }
  }

  async function destroy() {
    DestroyUserById(user.id)
    history.push('/admin/users');
  }
  
  return (
    <Container className={classes.container}>
      <form onSubmit={save}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={name}
              onInput={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" type="submit" variant="contained">
              Save
            </Button>
            <Button color="primary" variant="contained" onClick={destroy}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default EditClient
