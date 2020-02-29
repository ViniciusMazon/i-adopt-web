import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Login from '../src/pages/Login';
import SingUp from '../src/pages/SingUp'
import Home from '../src/pages/Home';
import Pets from '../src/pages/Pets';
import PetsCreate from '../src/pages/PetsCreate';
import PetsEdit from '../src/pages/PetsEdit';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/singup" component={SingUp} />
          <Route path="/home/:first_name" component={Home} />
          <Route exact path="/pets" component={Pets} />
          <Route path="/pets/new" component={PetsCreate} />
          <Route path="/pets/:id" component={PetsEdit} />
          {/* <Route path='*' component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
