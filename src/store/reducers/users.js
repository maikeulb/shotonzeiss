import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  users: [],
  loading: false,
};


const fetchUserProfileStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchUserProfilesSuccess = ( state, action ) => {
  return updateObject( state, {
    photos: action.photos,
    loading: false
  } );
};

const fetchProfileFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_USER_PROFILE_START: return fetchUserProfileStart(state, action);
    case actionTypes.FETCH_USER_PROFILE_SUCCESS: return fetchUserProfileSuccess(state, action);
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
    default: return state; 
  }
};

export default reducer
