import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  redirect: false,
  error: null,
  user: null,
  token: null,
  auth: true,
  authRedirectPath: '/'
};

const authLogin = (state, action) => {
  return updateObject( state, { 
    user: action.user,
    token: action.token,
    auth: true,
  } );
};

const authFail = (state, action) => {
  return updateObject( state, {
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { 
    redirect: true,
    auth: true,
    user: null,
    token: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.AUTH_LOGIN: return authLogin(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
    default:
      return state;
  }
};

export default reducer;
