import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../../components/UserPhotos/UserPhotos';

import axios from '../../axios';
import * as actions from '../../store/actions/index';
import { Spin, Divider, Tabs } from 'antd';
import './User.css';

const TabPane = Tabs.TabPane

class User extends Component {
  componentDidMount() {
    this.props.onFetchUserPhotos(this.props.match.params.id);
  }

  render() {
    let profile = <Spin />;
    if ( !this.props.loading && this.props.photos[0]) {
      profile = (
        <div style={{textAlign: "left"}}>
          <Divider orientation="right"> <h2>{ this.props.photos[0].displayName } </h2> </Divider>
          <Tabs tabPosition="top" tabBarStyle={{paddingLeft: '60px'}}>
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
    loading: state.photos.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPhotos: (id) => dispatch( actions.fetchUserPhotos(id) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
