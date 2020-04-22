import React from 'react';

import authReducer from './auth';

import * as actionTypes from '../actions/action-types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  });

  it('should return the initial state', () => {
    expect(authReducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'idToken',
      userId: 'userId'
    })).toEqual({
      token: 'idToken',
      userId: 'userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  });
});