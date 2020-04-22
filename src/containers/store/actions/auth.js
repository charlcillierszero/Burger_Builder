import axios from 'axios';

import * as actionTypes from './action-types';
import * as firebaseConstants from '../../../constants/firebase-constants';

const __authStart = () => ({ type: actionTypes.AUTH_START, });

const __authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

const __authFailed = error => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

const __checkAuthTimeout = expirationTime => dispatch =>
  setTimeout(() => dispatch(logout()), expirationTime);

const auth = (email, password, isSignUp) => dispatch => {
  dispatch(__authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  const url = isSignUp ? firebaseConstants.FIREBASE_USER_SIGNUP : firebaseConstants.FIREBASE_USER_SIGNIN;
  axios.post(`${url}${firebaseConstants.FIREBASE_WEB_API_KEY}`, authData)
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + (Number.parseInt(res.data.expiresIn) * 1000));
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', res.data.localId);
      dispatch(__authSuccess(res.data.idToken, res.data.localId));
      dispatch(__checkAuthTimeout(Number.parseInt(res.data.expiresIn) * 1000));
    })
    .catch(err => dispatch(__authFailed(err)));
};

const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(__authSuccess(token, userId));
      dispatch(__checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    } else {
      dispatch(logout());
    }
  }
}

export {
  auth,
  logout,
  setAuthRedirectPath,
  authCheckState,
}