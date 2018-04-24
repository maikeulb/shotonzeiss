import * as actionTypes from './actionTypes';
import axios from '../../axios-photos';

export const uploadInit = () => {
  return {
    type: actionTypes.UPLOAD_INIT
  };
};

export const uploadPhotoStart = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_START
  };
};

export const uploadPhotoSuccess = () => {
  return {
    type: actionTypes.UPLOAD_PHOTO_SUCCESS
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
    type: actionTypes.FETCH_USER_PHOTO_START
  };
};

export const fetchAllPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_ALL_PHOTOS_SUCCESS,
    photoData: photoData // has username
  };
};

export const fetchSinglePhotoSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_SINGLE_PHOTO_SUCCESS,
    photoData: photoData // has username
  };
};

export const fetchUserPhotoSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_USER_PHOTO_SUCCESS,
    photoData: photoData // has username
  };
};

export const fetchPhotosFail = ( error ) => {
  return {
    type: actionTypes.FETCH_PHOTOS_FAILED,
    error: error
  };
};

export const fetchAllPhotos = (token) => {
  return dispatch => {
    dispatch(fetchAllPhotosStart());
    const queryParams = '?auth=' + token;
    axios.get( '/photos.json' + queryParams )
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

export const fetchSinglePhoto = (photoId, token) => {
  return dispatch => {
    dispatch(fetchSinglePhotoStart());
    const queryParams = '?auth=' + token + '&equalTo="' + photoId + '"';
    axios.get( '/photos.json' + queryParams )
      .then( res => {
        const fetchedPhoto = [];
        for ( let key in res.data ) {
          fetchedPhoto.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchSinglePhotoSuccess(fetchedSinglePhoto));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};

export const fetchUserPhoto = (userId, token) => {
  return dispatch => {
    dispatch(fetchSinglePhotoStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get( '/photos.json' + queryParams )
      .then( res => {
        const fetchedPhoto = [];
        for ( let key in res.data ) {
          fetchedPhoto.push( {
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
