import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../../components/UserPhotos/UserPhotos';

import axios from '../../axios';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';
import { Divider } from 'antd';
import { Spin } from 'antd';

const Header= styled.h1 `
`;

class User extends Component {
  componentDidMount() {
    // this.props.onFetchUserProfile(this.props.match.params.id);
    this.props.onFetchUserPhotos(this.props.match.params.id);
  }

  render() {
    let profile = <Spin />;
    if ( !this.props.loading && this.props.photos[0]) {
      profile = (
        <div>
          <Divider orientation="right"> <Header> { this.props.photos[0].username } </Header> </Divider>
          <UserPhotos photos={ this.props.photos } userId={ this.props.photos[0].userId }/>
        </div>
      );
    }
    return profile
  }
}

const mapStateToProps = state => {
  return {
    // profile: state.users.profile,
    photos: state.photos.photos,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onFetchUserProfile: (id) => dispatch( actions.fetchUserProfile(id) ),
    onFetchUserPhotos: (id) => dispatch( actions.fetchUserPhotos(id) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
