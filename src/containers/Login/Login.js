import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import GoogleButton from 'react-google-button'

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  padding: "10px"
}

class Login extends Component {
  componentDidMount() {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  authWithGoogle() {
    this.props.onAuth();
  }

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div style={loginStyles}>
        {authRedirect}
        <GoogleButton onClick={() => { this.authWithGoogle() }} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch( actions.startLogin() ),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );
