import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import isAuthenticated from './auth/isAuthenticated';

import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Pets from '../src/pages/Pets';
import Application from '../src/pages/Application';
import NotFound404 from '../src/pages/NotFound404';


const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/pets">
          <Pets />
        </PrivateRoute>
        <PrivateRoute exact path="/applications">
          <Application />
        </PrivateRoute>
        <Route path='*'>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
