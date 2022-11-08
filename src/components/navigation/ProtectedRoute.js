import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, role, neededRole, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && role === neededRole) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
