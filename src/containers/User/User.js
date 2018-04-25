import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../UserPhotos/UserPhotos';

import axios from '../../axios-photos';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';

class User extends Component {
  componentDidMount() {
    // this.props.onFetchUserProfile(this.props.match.params.userId);
    // this.props.onFetchUserPhotos(this.props.match.params.userId);
  console.log(this.props.match.params.id)
  }
  render() {
    let propsUser = { 
      userId: 1, 
      username: "mike@gmail.com"
    };

    let { userId, username } = propsUser;
    return (
      <div>
        <h1>{ username }</h1>
        <UserPhotos userId={ userId }/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserProfile: (userId) => dispatch(actions.fetchUserProfile(userId)),
    onFetchUserPhotos: (userId) => dispatch(actions.fetchUserPhotos(userId)),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
