import { AuthLogin } from "../../api/services/auth"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogin(event) {
    event.preventDefault();

    const role = await AuthLogin(
      {
        username: username,
        password: password,
      }
    );
  
    if (role != null) {
      history.push('/');
    }
  }

  return (
    <Container className={classes.container}>
      <form onSubmit={handleLogin}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" type="submit" variant="contained">
              Log in
            </Button>
            <Button color="primary" variant="contained" href="/register">Sign up</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default withRouter(Login);
