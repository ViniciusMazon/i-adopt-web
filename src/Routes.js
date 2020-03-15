import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import NavBar from '../src/components/NavBar';

import Login from '../src/pages/Login';
import SingUp from '../src/pages/SingUp'
import Home from '../src/pages/Home';
import Pets from '../src/pages/Pets';
import PetsCreate from '../src/pages/PetsCreate';
import PetsEdit from '../src/pages/PetsEdit';
import Application from '../src/pages/Application';
import ApplicationReview from '../src/pages/ApplicationReview';
import NotFound404 from '../src/pages/NotFound404';


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/singup" component={SingUp} />
        <Router>
          <NavBar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/pets" component={Pets} />
            <Route path="/pets/new" component={PetsCreate} />
            <Route path="/pets/:id" component={PetsEdit} />
            <Route exact path="/applications" component={Application} />
            <Route path="/applications/review" component={ApplicationReview} />
            <Route path='*' component={NotFound404} />
          </Switch>
        </Router>
      </Switch>
    </Router>
  );
}