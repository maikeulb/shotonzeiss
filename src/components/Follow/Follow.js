import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Icon } from 'antd';

class Follow extends Component {
  handleClick = (e) => {
    e.preventDefault();
    if (this.props.isFollowing) {
      this.props.onUnfollowUser(this.props.followerId, this.props.followeeId);
    } else {
      this.props.onFollowUser(this.props.followerId, this.props.followeeId);
    }
  }

  render() {
    let followIcon= (this.props.isFollowing) ? "user-delete" : "user-add";

    return(
      <Icon 
        type= {followIcon} 
        onClick={ this.handleClick } 
        style={{fontSize: '20px', cursor: 'pointer'}} 
      />
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
