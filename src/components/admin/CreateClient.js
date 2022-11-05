import React from 'react'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loggedIn } from "../../app/store"
import { Create } from '../../api/services/users';
import { AuthRegister } from '../../api/services/auth';

const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
      display: "flex",
    },
  }));

const CreateClient = () => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const isLoggedIn = loggedIn();
  
    async function save(event) {
      event.preventDefault();
      if(isLoggedIn){
          Create(
            {
              username: username,
              name: name,
              password: password,
            }
          )
        }else{
          const data = await AuthRegister(
            {
              username: username,
              name: name,
              password: password,
              password_confirmation: passwordConfirmation
            }
          )
          alert(data.message);
        }
    }
    return (
        <Container>
            <form onSubmit={save}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    onInput={(e) => setUsername(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    onInput={(e) => setName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    variant="outlined"
                    onInput={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    type="password"
                  />
                </Grid>
                {!isLoggedIn ?
                    <Grid item xs={12}>
                        <TextField
                          label="Password Confirmation"
                          name="passwordConfirmation"
                          variant="outlined"
                          onInput={(e) => setPasswordConfirmation(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          type="password"
                        />
                    </Grid> : null}
            <Grid item xs={12}>
              <Button color="primary" type="submit" variant="contained">
                {isLoggedIn ? "Save" : "Register"}
              </Button>
                </Grid>
            </Grid>
            </form>
        </Container>
    )
}

export default CreateClient
