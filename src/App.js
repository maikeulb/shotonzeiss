import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Photos from './containers/Photos/Photos';
import './App.css';

class App extends Component {
  render () {
    let routes = (
        <Route path="/" exact component={Photos} />
    );
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


export default App;
