import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  profile: [],
  loading: false,
};


const fetchUserProfileStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchUserProfileSuccess = ( state, action ) => {
  return updateObject( state, {
    profile: action.profile,
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
