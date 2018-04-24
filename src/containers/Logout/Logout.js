import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Spin } from 'antd';

class Logout extends Component {
  componentWillMount() {
    this.props.onAuth();
  }

  render() {
    if (this.props.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <Spin />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( ) => dispatch( actions.startLogout() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Logout );
