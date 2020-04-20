import axios from 'axios';

import * as actionTypes from './action-types';
import * as firebaseConstants from '../../../constants/firebase-constants';

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