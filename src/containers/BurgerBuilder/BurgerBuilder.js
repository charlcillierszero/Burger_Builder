import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import ingredientTypes from '../../constants/ingredient-types';
import ingredientPrices from '../../constants/ingredient-prices';

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
      purchasable: false,
      purchasing: false
    }
  }

  updatePurchasableState = ingredients => Object.values(ingredients).reduce((total, next) => total + next, 0) > 0;

  addIngredientHandler = (type) => {
    if (this.state.ingredients[type] < 5) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type]++;
      const updatedPrice = this.state.totalPrice + ingredientPrices[type];
      const purchasable = this.updatePurchasableState(updatedIngredients);
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        purchasable: purchasable
      });
    }
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type]--;
      const updatedPrice = this.state.totalPrice - ingredientPrices[type];
      const purchasable = this.updatePurchasableState(updatedIngredients);
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        purchasable: purchasable
      });
    }
  }

  purchaseHandler = () => this.setState({ purchasing: true });
  purchaseCancelHandler = () => this.setState({ purchasing: false });
  purchaseContinueHandler = () => alert('You continue!');

  render() {
    const disableLessButtons = { ...this.state.ingredients };
    const disableMoreButtons = { ...disableLessButtons };
    for (const key in disableLessButtons) {
      disableLessButtons[key] = disableLessButtons[key] <= 0;
      disableMoreButtons[key] = disableMoreButtons[key] >= 5;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger
          ingredients={this.state.ingredients}
        />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disableLessButtons={disableLessButtons}
          disableMoreButtons={disableMoreButtons}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuiler;