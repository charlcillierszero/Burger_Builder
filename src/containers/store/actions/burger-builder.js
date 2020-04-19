import axios from '../../../axios-orders';
import * as actionTypes from './action-types';

const __setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

const __fetchIngredientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED });

const initIngredients = () => dispatch => {
  axios.get('/ingredients.json')
    .then(res => dispatch(__setIngredients(res.data)))
    .catch(err => dispatch(__fetchIngredientsFailed()));
};

const addIngredient = (ingredientType) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientType,
});

const removeIngredient = (ingredientType) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientType,
});

export {
  initIngredients,
  addIngredient,
  removeIngredient,
}