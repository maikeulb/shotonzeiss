import * as actionTypes from './actionTypes';
import axios from '../../axios-photos';

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

export const fetchAllPhotosSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_ALL_PHOTOS_SUCCESS,
    photos: photos
  };
};

export const fetchSinglePhotoSuccess = ( photos ) => {
  return {
    type: actionTypes.FETCH_SINGLE_PHOTO_SUCCESS,
    photos: photos
  };
};

export const addPhoto = ( name ) => {
  return {
    type: actionTypes.ADD_PHOTO,
    photoName: name
  };
};

export const removePhoto = ( name ) => {
  return {
    type: actionTypes.REMOVE_PHOTO,
    photoName: name
  };
};

export const fetchPhotosFail = () => {
  return {
    type: actionTypes.FETCH_PHOTOS_FAILED
  };
};

export const fetchAllPhotos = (userId, token) => {
  return dispatch => {
    dispatch(fetchAllPhotosStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
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
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + photoId + '"';
    axios.get( '/photos.json' + queryParams )
      .then( res => {
        const fetchedPhoto = [];
        for ( let key in res.data ) {
          fetchedPhoto.push( {
              ...res.data[key],
              id: key
          } );
        }
        dispatch(fetchSinglePhotoSuccess(fetchSinglePhoto));
      } )
    .catch( err => {
      dispatch(fetchPhotosFail(err));
    } );
  };
};
