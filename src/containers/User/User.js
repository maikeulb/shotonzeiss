import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../../components/UserPhotos/UserPhotos';

import axios from '../../axios';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';
import { Spin, Divider } from 'antd';

class User extends Component {
  componentDidMount() {
    this.props.onFetchUserPhotos(this.props.match.params.id);
  }

  render() {
    let profile = <Spin />;
    if ( !this.props.loading && this.props.photos[0]) {
      profile = (
        <div>
          <Divider orientation="right"> <h2>{ this.props.photos[0].displayName } </h2> </Divider>
          <UserPhotos photos={ this.props.photos } userId={ this.props.photos[0].userId }/>
        </div>
      );
    }
    return profile
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos.photos,
    loading: state.photos.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPhotos: (id) => dispatch( actions.fetchUserPhotos(id) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
