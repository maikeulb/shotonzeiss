import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';

import UserPhotos from '../../components/UserPhotos/UserPhotos';

import axios from '../../axios-photos';
import * as actions from '../../store/actions/index';
import styled from 'styled-components';
import { Divider } from 'antd';

const Header= styled.h1 `
`;

class User extends Component {
  componentDidMount() {
    // this.props.onFetchUserProfile(this.props.match.params.userId);
    // this.props.onFetchUserPhotos(this.props.match.params.userId);
  console.log(this.props.match.params.id)
  }

  render() {
    let { userId, username } = this.props.user;
    return (
      <div>
        <Divider orientation="right"> <Header> { username } </Header> </Divider>
        <UserPhotos photos={ this.props.photos } userId={ userId }/>
      </div>
    );
  }
}

let propsUser = { 
  userId: 1, 
  username: "mike@gmail.com"
};

let propsPhotos = [
  { id: 9, 
    photoUrl: "https://c2.staticflickr.com/4/3261/3228647240_ff320e465f_z.jpg",
    username: "michael@gmail.com",
    userId: 1
  },
  { id: 10, 
    photoUrl: "https://c2.staticflickr.com/4/3851/14586984988_be404b8229.jpg", 
    username: "michael@gmail.com",
    userId: 1
  },
  { id: 11, 
    photoUrl: "https://c2.staticflickr.com/2/1008/5187060734_fe0f56630f_z.jpg",
    username: "michael@gmail.com",
    userId: 1
  },
  { id: 12, 
    photoUrl: "https://c1.staticflickr.com/5/4131/5099175981_d81d3ced3a_z.jpg",
    username: "michael@gmail.com",
    userId: 1
  },
];

const mapStateToProps = state => {
  return {
    user: propsUser,
    photos: propsPhotos,
  };
};

// const mapStateToProps = state => {
//   return {
//     // user: state.users.user,
//     // photos: state.photos.photos,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserProfile: (userId) => dispatch(actions.fetchUserProfile(userId)),
    onFetchUserPhotos: (userId) => dispatch(actions.fetchUserPhotos(userId)),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( User, axios ) );
