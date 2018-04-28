import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const fetchFollowingsStart = () => {
  return {
    type: actionTypes.FETCH_FOLLOWINGS_START
  };
};

export const fetchFollowingsSuccess = ( followings ) => {
  return {
    type: actionTypes.FETCH_FOLLOWINGS_SUCCESS,
    followings: followings
  };
};

export const fetchFollowingsFail = ( error ) => {
  return {
    type: actionTypes.FETCH_FOLLOWINGS_FAIL,
    error: error
  };
};

export const fetchFollowings = (userId) => {
  console.log('im called')
  return dispatch => {
    dispatch(fetchFollowingsStart());
    firebase.database().ref('following')
      .child(userId)
      .once('value')
      .then((snapshot) => {
        const fetchedFollowings = [];
        snapshot.forEach((photo) => {
          fetchedFollowings.push(photo.key) 
        })
       console.log(fetchedFollowings)
        dispatch(fetchFollowingsSuccess(fetchedFollowings));
      })
    .catch( err => {
      dispatch(fetchFollowingsFail(err));
    } );
  };
};
