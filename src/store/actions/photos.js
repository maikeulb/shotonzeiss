import * as actionTypes from './actionTypes';
import firebase from 'firebase';

export const submitPhotoStart = () => {
  return {
    type: actionTypes.SUBMIT_PHOTO_START
  };
};

export const submitPhotoSuccess = ( id, photoData ) => {
  return {
    type: actionTypes.SUBMIT_PHOTO_SUCCESS,
    photoId: id,
    photoData: photoData,
  };
};

export const submitPhotoFail = () => {
  return {
    type: actionTypes.SUBMIT_PHOTO_FAIL
  };
};

export const uploadPhotoStart = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_START
  };
};

export const uploadPhotoSuccess = ( url, filename ) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_SUCCESS,
    photoUrl: url,
    photo: filename, 
  };
};

export const uploadPhotoFail = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_FAIL
  };
};

export const submitPhoto = ( photoData, token ) => {
  return dispatch => {
    dispatch( submitPhotoStart() );
    const fetchedFollowers =[];
    const promises= []; 

    const promiseA=firebase.database()
      .ref('photos')
      .push({...photoData})
    promises.push(promiseA);

    const promiseB=firebase.database()
      .ref('followers')
      .child(photoData.userId)
      .once('value')
    promises.push(promiseB);

    const promiseC=promiseB
      .then( (snap) => {
        snap.forEach((follower) => {
          fetchedFollowers.push(follower.key)
        });
      });
    promises.push(promiseC)
        
    promiseC.then( () => {
      fetchedFollowers.forEach((follower)=> {
        promises.push(firebase.database()
          .ref('feeds')  
          .child(follower)
          .child('photos')
          .push({...photoData})
        )
      })
    });

    Promise.all(promises)
      .then( ref => {
        dispatch( submitPhotoSuccess( ref[0].key, photoData ) );
      })
      .catch( error => {
        dispatch( submitPhotoFail( error ) );
      })

  };
};

export const uploadPhoto = ( filename, token ) => {
  return dispatch => {
    dispatch( uploadPhotoStart() );
    firebase.storage().ref('photos').child(filename).getDownloadURL()
      .then(url => {
        dispatch (uploadPhotoSuccess ( url, filename ));  
      })
      .catch( error => {
        dispatch( uploadPhotoFail( error ) );
      } );
  };
};

export const fetchAllPhotosStart = () => {
  return {
    type: actionTypes.FETCH_ALL_PHOTOS_START
  };
};

export const fetchUserPhotosStart = () => {
  return {
    type: actionTypes.FETCH_USER_PHOTOS_START
  };
};

export const fetchFriendsPhotosStart = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_PHOTOS_START
  };
};

export const fetchAllPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_ALL_PHOTOS_SUCCESS,
    photos: photos
  };
};

export const fetchUserPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_USER_PHOTOS_SUCCESS,
    photos: photos
  };
};

export const fetchFriendsPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_FRIENDS_PHOTOS_SUCCESS,
    friendsPhotos: photos
  };
};

export const fetchPhotosFail = ( error ) => {
  return {
    type: actionTypes.FETCH_PHOTOS_FAIL,
    error: error
  };
};

export const fetchAllPhotos = () => {
  return dispatch => {
    dispatch(fetchAllPhotosStart());
    firebase.database().ref('photos')
      .once('value')
      .then((snapshot) => {
        const fetchedPhotos = [];
        snapshot.forEach((photo) => {
          fetchedPhotos.push({
            ...photo.val(),
            id:photo.key,
          }) 
        })
        dispatch(fetchAllPhotosSuccess(fetchedPhotos));
      })
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    });
  };
};

export const fetchUserPhotos = (userId) => {
  return dispatch => {
    dispatch(fetchUserPhotosStart());
    firebase.database().ref('photos')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then((snapshot) => {
        const fetchedPhotos = [];
        snapshot.forEach((photo) => {
          fetchedPhotos.push({
            ...photo.val(),
            id:photo.key,
          }) 
        })
        dispatch(fetchUserPhotosSuccess(fetchedPhotos));
      })
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};


export const fetchFriendsPhotos = (userId) => {
  return dispatch => {
    dispatch(fetchFriendsPhotosStart());
    firebase.database().ref('feeds')
      .child(userId)
      .child('photos')
      .once('value')
      .then((snapshot) => {
        const fetchedPhotos = [];
        snapshot.forEach((photo) => {
          fetchedPhotos.push({
            ...photo.val(),
            id:photo.key,
          }) 
        })
        dispatch(fetchFriendsPhotosSuccess(fetchedPhotos));
      })
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};
