import axios from 'axios';

import * as actionTypes from './action-types';

const firebaseUserSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const firebaseWebAPIKey = '[API_KEY]'; // where [API_KEY] refers to the Web API Key from firebase

const __authStart = () => ({ type: actionTypes.AUTH_START, });

const __authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

const __authFailed = error => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

const auth = (email, password) => dispatch => {
  dispatch(__authStart());
  axios.post(`${firebaseUserSignUp}${firebaseWebAPIKey}`)
};

export {
  auth,
}