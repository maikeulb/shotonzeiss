import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Icon } from 'antd';

const handleClick = (e) => {
  e.preventDefault();
  if (this.props.isFollowing) {
    this.props.onUnfollowUser(this.props.followeeId);
  } else {
    this.props.onFollowUser(this.props.followerId);
  }
}


class Follow extends Component {
  render() {
    const followIcon= (this.props.isFollowing) ? "user-delete" : "user-add";

    return(
      <Icon type= {followIcon} onClick={ this.handleClick } style={{fontSize: '16', pointer: 'cursor'}} />
    );
  }
}


const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFollowUser: (followerId, followeeId) => dispatch( actions.addFollowings(followerId, followeeId) ),
    onUnfollowUser: (followerId, followeeId) => dispatch( actions.removeFollowings(followerId, followeeId) ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Follow );
