import * as actionTypes from '../actions/action-types';
import { updateObject } from './utils';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
}

const __authSuccess = (state, action) => updateObject(state, {
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false,
});

const __authFailed = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const __authLogout = state => updateObject(state, { token: null, userId: null });

const setAuthRedirectPath = (state, action) => updateObject(state, { authRedirectPath: action.path });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS: return __authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return __authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return __authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default reducer;