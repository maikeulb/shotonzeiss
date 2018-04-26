import * as actionTypes from './actionTypes';
import axios from '../../axios';
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
    photo: ''
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
    axios.post( `/photos.json?auth=${token}`, photoData )
      .then( response => {
        dispatch( submitPhotoSuccess( response.data.name, photoData ) );
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

export const fetchPhotosFail = ( error ) => {
  return {
    type: actionTypes.FETCH_PHOTOS_FAIL,
    error: error
  };
};

export const fetchAllPhotos = () => {
  return dispatch => {
    dispatch(fetchAllPhotosStart());
    axios.get( '/photos.json')
      .then( res => {
        const fetchedPhotos = [];
        for ( let key in res.data ) {
          fetchedPhotos.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchAllPhotosSuccess(fetchedPhotos));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};

export const fetchUserPhotos = (userId) => {
  return dispatch => {
    dispatch(fetchUserPhotosStart());
    const queryParams = `?orderBy="userId"&equalTo="${userId}"`;
    axios.get( `/photos.json${ queryParams }`)
      .then( res => {
        const fetchedPhotos = [];
        for ( let key in res.data ) {
          fetchedPhotos.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchUserPhotosSuccess(fetchedPhotos));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};
