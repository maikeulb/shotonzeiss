import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  photos: [],
  loading: false,
};


const uploadInit = ( state, action ) => {
  return updateObject( state );
};

const uploadPhotoStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const uploadPhotoSuccess = ( state, action ) => {
  const newPhoto = updateObject( action.photoData, { id: action.photoId } );
  return updateObject( state, {
    loading: false,
    photos: state.photos.concat( newPhoto )
  } );
};

const uploadPhotoFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const fetchAllPhotosStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchSinglePhotoStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchUserPhotosStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchAllPhotosSuccess = ( state, action ) => {
  return updateObject( state, {
    photos: action.photos,
    loading: false
  } );
};

const fetchSinglePhotoSuccess = ( state, action ) => {
  return updateObject( state, {
    photos: action.photos,
    loading: false
  } );
};

const fetchUserPhotosSuccess = ( state, action ) => {
  return updateObject( state, {
    photos: action.photos,
    loading: false
  } );
};

const fetchPhotosFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.UPLOAD_PHOTO_INIT: return uploadInit(state, action);
        case actionTypes.UPLOAD_PHOTO_START: return uploadPhotoStart(state, action);
        case actionTypes.UPLOAD_PHOTO_SUCCESS: return uploadPhotoSuccess(state, action);
        case actionTypes.UPLOAD_PHOTO_FAIL: return uploadPhotoFail(state, action);
        case actionTypes.FETCH_ALL_PHOTOS_START: return fetchAllPhotosStart(state, action);
        case actionTypes.FETCH_ALL_PHOTOS_SUCCESS: return fetchAllPhotosSuccess(state, action);
        case actionTypes.FETCH_SINGLE_PHOTO_START: return fetchSinglePhotoStart(state, action);
        case actionTypes.FETCH_SINGLE_PHOTO_SUCCESS: return fetchSinglePhotoSuccess(state, action);
        case actionTypes.FETCH_USER_PHOTOS_START: return fetchUserPhotosStart(state, action);
        case actionTypes.FETCH_USER_PHOTOS_SUCCESS: return fetchUserPhotosSuccess(state, action);
        case actionTypes.FETCH_PHOTOS_FAIL: return fetchPhotosFail(state, action);
        default: return state; }
};

export default reducer
