import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchUserProfileStart = () => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_START
  };
};

export const fetchUserProfileSuccess = ( profile ) => {
  return {
    type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
    profile: profile // has username
  };
};

export const fetchProfileFail = ( error ) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: error
  };
};

export const fetchUserProfile = ( userId ) => {
  return dispatch => {
    dispatch(fetchUserProfileStart());
    const queryParams = '?&orderBy="userId"&equalTo="' + userId + '"';
    axios.get( '/users.json' + queryParams )
      .then( res => {
        const fetchedProfile = [];
        for ( let key in res.data ) {
          fetchedProfile.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchUserProfileSuccess(fetchedProfile));
      } )
    .catch( err => {
      dispatch(fetchProfileFail(err));
    } );
  };
};
