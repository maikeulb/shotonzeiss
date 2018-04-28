import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const addFollowingsStart = () => {
  return {
    type: actionTypes.ADD_FOLLOWINGS_START
  };
};

export const addFollowingsSuccess = ( followee ) => {
  return {
    type: actionTypes.ADD_FOLLOWINGS_SUCCESS,
    followee: followee
  };
};

export const addFollowingsFail = ( error ) => {
  return {
    type: actionTypes.ADD_FOLLOWINGS_FAIL,
    error: error
  };
};

export const removeFollowingsStart = () => {
  return {
    type: actionTypes.REMOVE_FOLLOWINGS_START
  };
};

export const removeFollowingsSuccess = ( followee ) => {
  return {
    type: actionTypes.REMOVE_FOLLOWINGS_SUCCESS,
    followee: followee
  };
};

export const removeFollowingsFail = ( error ) => {
  return {
    type: actionTypes.REMOVE_FOLLOWINGS_FAIL,
    error: error
  };
};

export const addFollowings = ( followerId, followeeId ) => {
  return dispatch => {
    const fetchedPhotos =[];
    dispatch( addFollowingsStart() );
    // firebase.database().ref('following')
      // .child(followerId)
      // .update({
        // [followeeId]:true
      // })
      // .then( () => {
        firebase.database().ref('photos')
          .orderByChild('userId')
          .equalTo(followerId)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((photo) => {
              fetchedPhotos.push({
                ...photo.val(),
                id:photo.key,
              })
            })
          })
        // })
      .then( () => {
        console.log(fetchedPhotos.ForEAch)
        console.log(followerId)
        firebase.database().ref('feeds')  
          .child(followerId)
          .child('photos')
          .push({ ...{fetchedPhotos}} )
          .then( ref => {
            console.log(ref)
            dispatch( addFollowingsSuccess( followeeId ) );
          })
          .catch( error => {
            dispatch( addFollowingsFail( error ) );
          });
      });
  };
};

export const removeFollowings = ( followerId, followeeId ) => {
  return dispatch => {
    dispatch( removeFollowingsStart() );
    firebase.database().ref('following').child(followerId).update({
      [followeeId]:null
    })
      .then( ref => {
        dispatch( removeFollowingsSuccess( followeeId ));
      })
      .catch( error => {
        dispatch( removeFollowingsFail( error ) );
      });
  };
};

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
        dispatch(fetchFollowingsSuccess(fetchedFollowings));
      })
    .catch( err => {
      dispatch(fetchFollowingsFail(err));
    } );
  };
};
