import { combineReducers } from 'redux';

import burgerBuilderReducer from './reducers/burger-builder-reducer';

const rootReducer = combineReducers({
  burgerBuilderReducer,
});

export default rootReducer;