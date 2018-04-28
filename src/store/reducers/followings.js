import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
  followings: [],
  loading: false,
};

const addFollowingsStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const addFollowingsSuccess = ( state, action ) => {
  const newFollowings =  action.followee ;
  return updateObject( state, {
    loading: false,
    followings: state.followings.concat( newFollowings ),
  });
};

const addFollowingsFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const removeFollowingsStart = ( state, action ) => {
  return updateObject( state, 
    { loading: true } 
  );
};

const removeFollowingsSuccess = ( state, action ) => {
  const newFollowings =  action.followee ;
  return updateObject( state, {
    loading: false,
    followings: state.followings.filter(item => item !== newFollowings ),
  } );
};

const removeFollowingsFail = ( state, action ) => {
  return updateObject( state, { 
    loading: false 
  } );
};

const fetchFollowingsStart = ( state, action ) => {
  return updateObject( state, { 
    loading: true 
  } );
};

const fetchFollowingsSuccess = ( state, action ) => {
  return updateObject( state, {
    followings: action.followings,
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
    case actionTypes.FETCH_FOLLOWINGS_START: return fetchFollowingsStart(state, action);
    case actionTypes.FETCH_FOLLOWINGS_SUCCESS: return fetchFollowingsSuccess(state, action);
    case actionTypes.FETCH_FOLLOWINGS_FAIL: return fetchFollowingsFail(state, action);
    case actionTypes.ADD_FOLLOWINGS_START: return addFollowingsStart(state, action);
    case actionTypes.ADD_FOLLOWINGS_SUCCESS: return addFollowingsSuccess(state, action);
    case actionTypes.ADD_FOLLOWINGS_FAIL: return addFollowingsFail(state, action);
    case actionTypes.REMOVE_FOLLOWINGS_START: return removeFollowingsStart(state, action);
    case actionTypes.REMOVE_FOLLOWINGS_SUCCESS: return removeFollowingsSuccess(state, action);
    case actionTypes.REMOVE_FOLLOWINGS_FAIL: return removeFollowingsFail(state, action);
    default: return state; 
  }
};

export default reducer
