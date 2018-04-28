import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserPhotos from '../../components/UserPhotos/UserPhotos';
import Follow from '../../components/Follow/Follow';

import * as actions from '../../store/actions/index';
import { Spin, Divider, Tabs } from 'antd';
import './User.css';

const TabPane = Tabs.TabPane

class User extends Component {
  state = {
    isFollowing: this.props.followings.includes(this.props.match.params.id)
  };


  componentDidMount() {
    this.props.onFetchUserPhotos(this.props.match.params.id);
    this.props.onFetchFriendsPhotos(this.props.match.params.id);
    this.props.onFetchFollowings(this.props.auth.uid);
  }

   
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('user')
  //   console.log(nextProps)
  //   console.log(prevState)
  //   return null;
  //   }


  render() {
    console.log(this.props.followings)
    console.log(this.props.match.params.id)
    console.log(this.state.isFollowing)
    console.log(this.props.followings.includes(this.props.match.params.id))
    let follow;
    if ( this.props.auth.uid !== this.props.match.params.id) {
      follow = <Follow following = { this.state.isFollowing } followeeId={ this.props.match.params.id } followerId = { this.props.auth.uid } />
    }

    let friendPane;
    if ( !this.props.loading && this.props.friendsPhotos[0]) {
      friendPane= (
        <TabPane tab="Friends" key="2">
          <UserPhotos photos={ this.props.friendsPhotos } userId={ this.props.friendsPhotos[0].userId }/>
        </TabPane>
      );
    }

    let profile = <Spin />;
    if ( !this.props.loading && this.props.photos[0]) {
      profile = (
        <div>
          <Divider orientation="right"> <span><h2>{ this.props.photos[0].displayName } </h2> { follow }</span></Divider>
          <Tabs tabPosition="top">
            <TabPane tab="Feed" key="1">
              <UserPhotos photos={ this.props.photos } userId={ this.props.photos[0].userId }/>
            </TabPane>
            { friendPane }
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
    friendsPhotos: state.photos.friendsPhotos,
    followings: state.followings.followings,
    user: state.auth.user,
    auth: state.auth.user,
    loading: state.photos.loading,
    loading: state.followings.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserPhotos: (id) => dispatch( actions.fetchUserPhotos(id) ),
    onFetchFriendsPhotos: (id) => dispatch( actions.fetchFriendsPhotos(id) ),
    onFetchFollowings: (id) => dispatch( actions.fetchFollowings(id) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( User );
