import './App.css';
import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router"
import { Switch } from "react-router-dom";
import NotFound from "./views/NotFound";
import { loggedIn, getCurrentUser } from "./app/store";
import Client from "./views/client/Client"
import Admin from "./views/admin/Admin"
import Login from "./views/Login"
import Register from "./views/Register"
// import ProtectedRoute from './components/navigation/ProtectedRoute';
import NavigationBar from './components/navigation/NavigationBar';
// import { Role } from './helpers/role';
// import Client from './views/client/Client';
// import AdminClients from './views/admin/AdminClients';
// import AdminDevices from './views/admin/AdminDevices';
// import AdminClient from './views/admin/AdminClient';
// import AdminSensors from './views/admin/AdminSensors';
// import AdminDevice from './views/admin/AdminDevice';
// import AdminSensor from './views/admin/AdminSensor';
// import AdminCreate from './views/admin/AdminCreate';
// import ClientDevice from './views/client/ClientDevice';
// import ClientSensor from './views/client/ClientSensor';

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
  // const loggedIn = loggedIn();
  // const role = getCurrentUser().role;
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
          {/* 
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/devices"
            component={AdminDevices}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/device"
            component={AdminDevice}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/clients"
            component={AdminClients}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/client"
            component={AdminClient}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/sensors"
            component={AdminSensors}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/sensor"
            component={AdminSensor}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Admin}
            path="/admin/create"
            component={AdminCreate}
          />


          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Client}
            path="/client/device"
            component={ClientDevice}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Client}
            path="/client/sensor"
            component={ClientSensor}
          />
          <ProtectedRoute
            isAuthenticated={loggedIn}
            role={role}
            neededRole={Role.Client}
            path="/client"
            component={Client}
          /> */}
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
