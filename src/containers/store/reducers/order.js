import * as actionTypes from '../actions/action-types';
import { updateObject } from './utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
}

const __purchaseBurgerSuccess = state => {
  const copiedState = { ...state };
  copiedState.loading = false;
  copiedState.purchased = true;
  copiedState.error = null;
  return copiedState;
}

const __fetchOrdersSuccess = (state, action) => {
  const copiedState = { ...state };
  copiedState.orders = action.orders;
  copiedState.loading = false;
  return copiedState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS: return __purchaseBurgerSuccess(state);
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false, error: action.error });
    case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDER_START: return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_SUCCESS: return __fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL: return updateObject(state, { loading: false });
    default: return state;
  }
}

export default reducer;