import { combineReducers } from 'redux';

import burgerBuilder from './burger-builder';
import order from './order';

const rootReducer = combineReducers({
  burgerBuilder,
  order,
});

export default rootReducer;