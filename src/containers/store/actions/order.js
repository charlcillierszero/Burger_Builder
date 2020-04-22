import * as actionTypes from './action-types';
import axios from '../../../axios-orders';

const __purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id,
  orderData,
});

const __purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

const __purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START });

const purchaseBurger = (orderData, token, userId) => dispatch => {
  dispatch(__purchaseBurgerStart());
  axios.post(`/orders/${userId}.json?auth=${token}`, orderData)
    .then(res => dispatch(__purchaseBurgerSuccess(res.data.name, orderData)))
    .catch(err => dispatch(__purchaseBurgerFail(err)));
}

const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

const __fetchOrdersStart = (error) => ({
  type: actionTypes.FETCH_ORDER_START,
  error,
});

const __fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDER_SUCCESS,
  orders,
});

const __fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDER_FAIL,
  error,
});

const fetchOrders = (token, userId) => dispatch => {
  __fetchOrdersStart();
  axios.get(`/orders/${userId}.json?auth=${token}`)
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) { fetchedOrders.push({ ...res.data[key], id: key }); }
      dispatch(__fetchOrdersSuccess(fetchedOrders))
    })
    .catch(err => dispatch(__fetchOrdersFail(err)));
};

export {
  purchaseBurger,
  purchaseInit,
  fetchOrders,
}