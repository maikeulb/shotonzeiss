import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../UserPhotos/UserPhotos';

import axios from '../../axios-photos';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';

class User extends Component {
  state = {
    type: "photos",
  };

  componentDidMount() {
    // this.props.onFetchUserProfile(this.props.match.params.userId);
    // this.props.onFetchUserPhotos(this.props.match.params.userId);
  }

  render() {
    let { userId, username } = this.props.user;

    return (
      <div>
        username
        <UserPhotos userId={userId}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchUserProfile: (userId) => dispatch(actions.fetchUserProfile(userId)),
  onFetchUserPhotos: (userId) => dispatch(actions.fetchUserPhotos(userId)),
});

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
