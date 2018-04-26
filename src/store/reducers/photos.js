import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  photos: [],
  photo: '',
  loading: false,
  photoUrl: ''
};

const submitPhotoStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const submitPhotoSuccess = ( state, action ) => {
  const newPhoto = updateObject( action.photoData, { id: action.photoId } );
  return updateObject( state, {
    loading: false,
    photos: state.photos.concat( newPhoto )
  } );
};

const submitPhotoFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const uploadPhotoStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const uploadPhotoSuccess = ( state, action ) => {
  return updateObject( state, {
    loading: false,
    photoUrl: action.photoUrl,
    photo: action.photo,
  });
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
    case actionTypes.SUBMIT_PHOTO_START: return submitPhotoStart(state, action);
    case actionTypes.SUBMIT_PHOTO_SUCCESS: return submitPhotoSuccess(state, action);
    case actionTypes.SUBMIT_PHOTO_FAIL: return submitPhotoFail(state, action);
    case actionTypes.UPLOAD_PHOTO_START: return uploadPhotoStart(state, action);
    case actionTypes.UPLOAD_PHOTO_SUCCESS: return uploadPhotoSuccess(state, action);
    case actionTypes.UPLOAD_PHOTO_FAIL: return uploadPhotoFail(state, action);
    case actionTypes.FETCH_ALL_PHOTOS_START: return fetchAllPhotosStart(state, action);
    case actionTypes.FETCH_ALL_PHOTOS_SUCCESS: return fetchAllPhotosSuccess(state, action);
    case actionTypes.FETCH_USER_PHOTOS_START: return fetchUserPhotosStart(state, action);
    case actionTypes.FETCH_USER_PHOTOS_SUCCESS: return fetchUserPhotosSuccess(state, action);
    case actionTypes.FETCH_PHOTOS_FAIL: return fetchPhotosFail(state, action);
    default: return state; 
  }
};

export default reducer
