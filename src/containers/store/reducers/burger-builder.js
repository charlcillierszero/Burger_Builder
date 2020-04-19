import * as actionTypes from '../actions/action-types';
import ingredientPrices from '../../../constants/ingredient-prices';
import { updateObject } from './utils';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
}

const __setIngredients = (state, action) => {
  const copiedState = { ...state };
  copiedState.ingredients = action.ingredients;
  let price = 4;
  for (let key in action.ingredients) { price += action.ingredients[key] * ingredientPrices[key]; }
  copiedState.totalPrice = price;
  copiedState.error = false;
  return copiedState;
}

const __addIngredient = (state, action) => {
  const copiedState = { ...state };
  if (copiedState.ingredients[action.ingredientType] < 5) {
    const updatedIngredients = { ...copiedState.ingredients };
    updatedIngredients[action.ingredientType]++;
    copiedState.ingredients = updatedIngredients;
    copiedState.totalPrice = copiedState.totalPrice + ingredientPrices[action.ingredientType];
  }
  return copiedState;
}

const __removeIngredient = (state, action) => {
  const copiedState = { ...state };
  if (copiedState.ingredients[action.ingredientType] > 0) {
    const updatedIngredients = { ...copiedState.ingredients };
    updatedIngredients[action.ingredientType]--;
    copiedState.ingredients = updatedIngredients;
    copiedState.totalPrice = copiedState.totalPrice - ingredientPrices[action.ingredientType];
  }
  return copiedState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: return __setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    case actionTypes.ADD_INGREDIENT: return __addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return __removeIngredient(state, action);
    default: return state;
  }
}

export default reducer;