import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import isAuthenticated from './auth/isAuthenticated';

import Login from '../src/pages/Login';
import SingUp from '../src/pages/SingUp'
import Home from '../src/pages/Home';
import Pets from '../src/pages/Pets';
import PetsCreate from '../src/pages/PetsCreate';
import PetsEdit from '../src/pages/PetsEdit';
import Application from '../src/pages/Application';
import ApplicationReview from '../src/pages/ApplicationReview';
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
        <Route path="/singup">
          <SingUp />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/pets">
          <Pets />
        </PrivateRoute>
        <PrivateRoute path="/pets/new">
          <PetsCreate />
        </PrivateRoute>
        <PrivateRoute path="/pets/:id">
          <PetsEdit />
        </PrivateRoute>
        <PrivateRoute exact path="/applications">
          <Application />
        </PrivateRoute>
        <PrivateRoute path="/applications/review/:id">
          <ApplicationReview />
        </PrivateRoute>
        <Route path='*'>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
