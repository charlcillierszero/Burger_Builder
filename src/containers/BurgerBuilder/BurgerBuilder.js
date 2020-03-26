import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import ingredientTypes from '../../constants/ingredient-types';
import ingredientPrices from '../../constants/ingredient.prices';

class BurgerBuiler extends Component {
  constructor(props) {
    super(props);
    const ingredients = {};
    ingredients[ingredientTypes.SALAD] = 0;
    ingredients[ingredientTypes.BACON] = 0;
    ingredients[ingredientTypes.CHEESE] = 0;
    ingredients[ingredientTypes.MEAT] = 0;
    this.state = {
      ingredients,
      totalPrice: 4,
    }
  }

  addIngredientHandler = (type) => {
    if (this.state.ingredients[type] < 5) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type]++;
      const updatedPrice = this.state.totalPrice + ingredientPrices[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      });
    }
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type]--;
      const updatedPrice = this.state.totalPrice - ingredientPrices[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      });
    }
  }

  render() {
    const disableLessButtons = { ...this.state.ingredients };
    const disableMoreButtons = { ...disableLessButtons };
    for (const key in disableLessButtons) {
      disableLessButtons[key] = disableLessButtons[key] <= 0;
      disableMoreButtons[key] = disableMoreButtons[key] >= 5;
    }
    return (
      <Aux>
        <Burger
          ingredients={this.state.ingredients}
        />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disableLessButtons={disableLessButtons}
          disableMoreButtons={disableMoreButtons}
        />
      </Aux>
    );
  }
}

export default BurgerBuiler;