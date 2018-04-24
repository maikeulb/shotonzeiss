import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import Photos from './containers/Photos/Photos';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import './App.css';

// class App extends Component {
//   render () {
//     let routes = (
//         <Route path="/" exact component={Photos} />
//     );
//     return (
//       <div className="App">
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }

// export default App;

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Photos} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
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
