import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  photos: [],
  friendsPhotos: [],
  followings: [],
  photo: '',
  photoUrl: '',
  loading: false,
};

const submitPhotoStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const submitPhotoSuccess = ( state, action ) => {
  const newPhoto = updateObject( action.photoData, { id: action.photoId } );
  console.log(newPhoto)
  console.log(state.photos)
  console.log(updateObject( state, { photos: state.photos.concat(newPhoto)}))
  return updateObject( state, {
    loading: false,
    photos: state.photos.concat( newPhoto ),
    photo: '',
    photoUrl: ''
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

const fetchFollowingsStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchUserPhotosStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchFriendsPhotosStart = ( state, action ) => {
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

const fetchFollowingsSuccess = ( state, action ) => {
  return updateObject( state, {
    followings: action.followings,
    loading: false
  } );
};

const fetchUserPhotosSuccess = ( state, action ) => {
  return updateObject( state, {
    photos: action.photos,
    loading: false
  } );
};

const fetchFriendsPhotosSuccess = ( state, action ) => {
  return updateObject( state, {
    friendsPhotos: action.friendsPhotos,
    loading: false
  } );
};

const fetchPhotosFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const fetchFollowingsFail = ( state, action ) => {
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
    case actionTypes.FETCH_FRIENDS_PHOTOS_START: return fetchFriendsPhotosStart(state, action);
    case actionTypes.FETCH_FRIENDS_PHOTOS_SUCCESS: return fetchFriendsPhotosSuccess(state, action);
    case actionTypes.FETCH_PHOTOS_FAIL: return fetchPhotosFail(state, action);
    case actionTypes.FETCH_FOLLOWINGS_START: return fetchFollowingsStart(state, action);
    case actionTypes.FETCH_FOLLOWINGS_SUCCESS: return fetchFollowingsSuccess(state, action);
    case actionTypes.FETCH_FOLLOWINGS_FAIL: return fetchFollowingsFail(state, action);
    default: return state; 
  }
};

export default reducer
