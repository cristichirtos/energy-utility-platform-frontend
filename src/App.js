import './App.css';
import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router"
import { Switch } from "react-router-dom";
import NotFound from "./views/NotFound";
import { loggedIn, getCurrentUser } from "./app/store";
import Client from "./views/client/Client";
import Admin from "./views/admin/Admin";
import Login from "./views/Login";
import Register from "./views/Register";
import ProtectedRoute from './components/navigation/ProtectedRoute';
import NavigationBar from './components/navigation/NavigationBar';
import { Role } from './helpers/role';
import User from './views/admin/User';
import Users from './views/admin/Users';
import Device from './views/admin/Device';
import Devices from './views/admin/Devices';
import NewClient from './views/admin/NewClient'
import NewDevice from './views/admin/NewDevice'
import ClientDevice from './views/client/ClientDevice';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#467599",
    },
    error: {
      main: "#ff521b",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter forceRefresh={true} >
      <NavigationBar/>
        <Switch>
          <Route exact path="/">
            { loggedIn() ? 
            (getCurrentUser().role == 'Client' ? <Client /> : <Admin />) : 
            <Redirect to="/login" /> }
          </Route>
          <Route
            path="/login"
            component={Login}>
          </Route>
          <Route
            path="/register"
            component={Register}>
          </Route>
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Client}
            path="/client/device"
            component={ClientDevice}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/users"
            component={Users}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/new-user"
            component={NewClient}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/user"
            component={User}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/devices"
            component={Devices}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/device"
            component={Device}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn()}
            role={loggedIn() ? getCurrentUser().role : null}
            neededRole={Role.Admin}
            path="/admin/new-device"
            component={NewDevice}
          />
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
