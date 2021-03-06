import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import Photos from './containers/Photos/Photos';
import Users from './containers/Users/Users';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Upload from './components/Upload/Upload';
import UserProfile from './containers/UserProfile/UserProfile';
import './App.css';


class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route exact path="/" component={Photos} />
        <Route path="/login" component={Login} />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route exact path="/" component={Photos} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/upload" component={Upload} />
          <Route path="/users/:id" component={UserProfile} />
          <Route path="/people" component={Users} />
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

export default withRouter( connect( mapStateToProps, null )( App ));
