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
    firebase.database().ref('photos').push({...photoData})
      .then( ref => {
        dispatch( submitPhotoSuccess( ref.key, photoData ) );
      } )
      .catch( error => {
        dispatch( submitPhotoFail( error ) );
      } );
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
  console.log('im called')
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


// export const fetchFriendsPhotos = (userId) => {
//   return dispatch => {
//     dispatch(fetchFriendsPhotosStart());
//     let friendlst = [];
//     let fetchedPhotos = [];
//     firebase.database().ref('followings')
//       .child(userId)
//       .once('value')
//       .then((snapshot) => {
//         snapshot.forEach((friend) => {
//           friendlst.push({
//             ...friend.val(),
//           }) 
//         })
//       })
//       .then (() => {
//         ["1", "2"].forEach((uid) => {
//           firebase.database().ref('photos')
//             .orderByChild('userId')
//             .equalTo(uid)
//             .once('value')
//             .then((snapshot) => {
//               snapshot.forEach((photo) => {
//                 console.log(photo)
//                 console.log(uid)
//                 fetchedPhotos.push({
//                   ...photo.val(),
//                   id:photo.key,
//                 }) 
//               })
//             })
//           .catch( err => {
//             dispatch(fetchPhotosFail(err));
//           });
//         })
//         dispatch(fetchFriendsPhotosSuccess(fetchedPhotos));
//       })
//   };
// };
// export const fetchFriendsPhotos = (userId) => {
//   return dispatch => {
//     dispatch(fetchFriendsPhotosStart());
//     let friendlst = [];
//     let fetchedPhotos = [];
//     firebase.database().ref('followings')
//       .child(userId)
//       .once('value')
//       .then((snapshot) => {
//         snapshot.forEach((friend) => {
//           friendlst.push({
//             ...friend.val(),
//           }) 
//         })
//       })
//       .then (() => {
//         ["1", "2"].forEach((uid) => {
//           firebase.database().ref('photos')
//             .orderByChild('userId')
//             .equalTo(uid)
//             .once('value')
//             .then((snapshot) => {
//               snapshot.forEach((photo) => {
//                 console.log(photo)
//                 console.log(uid)
//                 fetchedPhotos.push({
//                   ...photo.val(),
//                   id:photo.key,
//                 }) 
//               })
//             })
//           .catch( err => {
//             dispatch(fetchPhotosFail(err));
//           });
//         })
//         dispatch(fetchFriendsPhotosSuccess(fetchedPhotos));
//       })
//   };
// };
