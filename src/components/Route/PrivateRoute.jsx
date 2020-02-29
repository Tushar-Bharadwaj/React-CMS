import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "services/AuthenticationService";
/**
 * Router Component that accomodates different layouts
 */

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = AuthenticationService.currentUserValue;
      if (!currentUser) {
        return <Redirect to={{ pathname: "/" }} />;
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default PrivateRoute;
