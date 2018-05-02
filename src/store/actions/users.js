import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = ( users ) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  };
};

export const fetchUsersFail = ( error ) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart());
    firebase.database().ref('users')
      .once('value')
      .then((snapshot) => {
        const fetchedUsers = [];
        snapshot.forEach((user) => {
          fetchedUsers.push({
            ...user.val(),
            id:user.key,
          }) 
        })
        dispatch(fetchUsersSuccess(fetchedUsers));
      })
    .catch( err => {
      dispatch(fetchUsersFail(err));
    });
  };
};
