import { firebase, googleProvider } from '../../firebase';
import * as actionTypes from './actionTypes';

export const authLogin = (user, token) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    user: user,
    token: token
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export function verifyAuth() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
          dispatch(authLogin(user, token));
        })
      } else {
        dispatch(authLogout());
      }
    });
  }
}

export const startLogout = () => {
  return dispatch => {
    firebase.auth().signOut()
      .then(response => {
        dispatch(authLogout());
      })
      .catch(err => {
        dispatch(authFail(err.response));
      });
  };
};

export const startLogin = () => {
  return dispatch => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(response => {
         console.log(response)
         dispatch(authLogin(response.user, response.credential.accessToken));
      })
      .catch(err => {
         dispatch(authFail(err.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
