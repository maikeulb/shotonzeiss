import merge from 'lodash/merge';

import {
  RECEIVE_SINGLE_PHOTO,
  RECEIVE_ALL_PHOTOS
} from '../actions/photo_actions';

const defaultState = {};

const PhotosReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SINGLE_PHOTO:
      return merge({}, state, action.photo);
    case RECEIVE_ALL_PHOTOS:
      return merge({}, state, action.photos);
    default:
      return state;
  }
};

export default PhotosReducer;
