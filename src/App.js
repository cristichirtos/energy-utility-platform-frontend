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
import { useEffect } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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
  useEffect(() => {
    if (loggedIn()) {
      const ws = new WebSocket('ws://energy-utility-plaform.herokuapp.com/cable');
      ws.onopen = () => {
        const msg = {
          command: 'subscribe',
          identifier: JSON.stringify({
            id: getCurrentUser().id,
            channel: 'NotificationsChannel'
          })
        };
        ws.send(JSON.stringify(msg));
      }
      ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        try {
          if (data.message.body) {
            Store.addNotification({
              title: "Energy consumption alert",
              message: data.message.body,
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
          }
        } catch {
          //do nothing
        }
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter forceRefresh={true} >
      <ReactNotifications />
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
