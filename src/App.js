import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import Photos from './containers/Photos/Photos';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Upload from './containers/Upload/Upload';
import User from './containers/User/User';
import './App.css';


class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/upload" component={Upload} />
        <Route path="/users/:id" component={User} />
        <Route path="/" exact component={Photos} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/upload" component={Upload} />
          <Route path="/users/:id" component={User} />
          <Route path="/" exact component={Photos} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null
  };
};

export default withRouter( connect( mapStateToProps )( App ) );
