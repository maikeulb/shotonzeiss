import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler';

import Photos from './Photos/Photos';

import axios from '../../axios-photos';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';

class User extends Component {
  state = {
    type: "photos",
  };

  componentDidMount() {
    // this.props.onFetchUserProfile(this.props.match.params.id);
    // this.props.onFetchUserPhotos(this.props.match.params.id);
  }

  render() {
    let { userId, username } = this.props.user;

    let personalButton = <Upload />;

    return (
      <div>
        username
      </div>
      <div>
        <Photos userId={userId}/>
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
