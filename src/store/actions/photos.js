import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const uploadInit = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_INIT
  };
};

export const uploadPhotoStart = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_START
  };
};

export const uploadPhotoSuccess = ( id, photoData ) => {
  return {
    type: actionTypes.UPLOAD_PHOTO_SUCCESS,
    photoId: id,
    photoData: photoData
  };
};

export const uploadPhotoFail = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_FAIL
  };
};

export const uploadPhoto = ( photoData, token ) => {
  return dispatch => {
    dispatch( uploadPhotoStart() );
    axios.post( '/photos.json?auth=' + token, photoData )
      .then( response => {
        dispatch( uploadPhotoSuccess( response.data.name, photoData ) );
      } )
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

export const fetchSinglePhotoStart = () => {
  return {
    type: actionTypes.FETCH_SINGLE_PHOTO_START
  };
};

export const fetchUserPhotoStart = () => {
  return {
    type: actionTypes.FETCH_USER_PHOTOS_START
  };
};

export const fetchAllPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_ALL_PHOTOS_SUCCESS,
    photos: photos// has username
  };
};

export const fetchSinglePhotoSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_SINGLE_PHOTO_SUCCESS,
    photos: photos // has username
  };
};

export const fetchUserPhotoSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_USER_PHOTOS_SUCCESS,
    photos: photos // has username
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

export const fetchSinglePhoto = (photoId) => {
  return dispatch => {
    dispatch(fetchSinglePhotoStart());
    const queryParams = '?&equalTo="' + photoId + '"';
    axios.get( '/photos.json' + queryParams )
      .then( res => {
        const fetchedPhoto = [];
        for ( let key in res.data ) {
          fetchedPhoto.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchSinglePhotoSuccess(fetchedPhoto));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};

export const fetchUserPhoto = (userId) => {
  return dispatch => {
    dispatch(fetchUserPhotoStart());
    const queryParams = '?&orderBy="userId"&equalTo="' + userId + '"';
    axios.get( '/photos.json' + queryParams )
      .then( res => {
        const fetchedPhotos = [];
        for ( let key in res.data ) {
          fetchedPhotos.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchUserPhotoSuccess(fetchedPhotos));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};
