import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';

import regeneratorRuntime from 'regenerator-runtime';
import Home from './components/Home.jsx';

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/games" />
      <Route exact path="/:page?" render={(props) => <Home {...props} />} />
    </Switch>
  );
};

export default App;
