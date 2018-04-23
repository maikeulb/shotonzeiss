import React, { Component } from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';

import Photos from './containers/Photos';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={PhotosContainer} />
       </Switch>
      </div>
    );
  }
}

export default App;
