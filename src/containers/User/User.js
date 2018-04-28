import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../../components/UserPhotos/UserPhotos';
import Follow from '../../components/Follow/Follow';

import axios from '../../axios';
import * as actions from '../../store/actions/index';
import { Spin, Divider, Tabs, Icon } from 'antd';
import './User.css';

const TabPane = Tabs.TabPane

class User extends Component {
  componentDidMount() {
    this.props.onFetchUserPhotos(this.props.match.params.id);
  }

  render() {
    let profile = <Spin />;

    let follow;
    if ( this.props.user.uid !== this.props.photos[0].userId)
      follow = <Follow />

    console.log(this.props.user)
    if ( !this.props.loading && this.props.photos[0]) {
      profile = (
        <div>
          <Divider orientation="right"> <span><h2>{ this.props.photos[0].displayName } </h2> { follow }</span></Divider>
          <Tabs tabPosition="top">
            <TabPane tab="Feed" key="1">
              <UserPhotos photos={ this.props.photos } userId={ this.props.photos[0].userId }/>
            </TabPane>
            <TabPane tab="Friends" key="2">
              <UserPhotos photos={ this.props.photos } userId={ this.props.photos[0].userId }/>
            </TabPane>
          </Tabs>
        </div>
      );
    }
    return profile
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos.photos,
    user: state.auth.user,
    loading: state.photos.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPhotos: (id) => dispatch( actions.fetchUserPhotos(id) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
