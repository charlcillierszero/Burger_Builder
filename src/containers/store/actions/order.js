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

const purchaseBurger = orderData => dispatch => {
  dispatch(__purchaseBurgerStart());
  axios.post('/orders.json', orderData)
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

const fetchOrders = () => dispatch => {
  __fetchOrdersStart();
  axios.get('/orders.json')
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