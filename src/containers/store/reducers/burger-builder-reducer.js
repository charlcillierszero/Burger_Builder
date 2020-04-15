import * as actionTypes from '../action-types';
import ingredientPrices from '../../../constants/ingredient-prices';

const initialState = {
  ingredients: null,
  totalPrice: 0,
}

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      updatedState.ingredients = action.ingredients;
      let price = 0;
      for (let key in action.ingredients) {
        price += action.ingredients[key] * ingredientPrices[key];
      }
      updatedState.totalPrice = price;
      return updatedState;
    case actionTypes.ADD_INGREDIENT:
      if (state.ingredients[action.ingredientType] < 5) {
        const updatedIngredients = { ...updatedState.ingredients };
        updatedIngredients[action.ingredientType]++;
        updatedState.ingredients = updatedIngredients;
        updatedState.totalPrice = updatedState.totalPrice + ingredientPrices[action.ingredientType];
      }
      return updatedState;
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientType] > 0) {
        const updatedIngredients = { ...updatedState.ingredients };
        updatedIngredients[action.ingredientType]--;
        updatedState.ingredients = updatedIngredients;
        updatedState.totalPrice = updatedState.totalPrice - ingredientPrices[action.ingredientType];
      }
      return updatedState;
    default:
      return updatedState;
  }
}

export default reducer;