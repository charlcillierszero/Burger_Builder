import React, { Component } from 'react';

import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliry/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

import ingredientPrices from '../../constants/ingredient-prices';

class BurgerBuiler extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(err => this.setState({ error: true }));
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
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'John Doe',
        address: {
          street: 'Teststreet 1',
          zipCode: '1234',
          country: 'Country'
        },
        email: 'john.doe@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .finally(() => {
        this.setState({
          loading: false,
          purchasing: false
        })
      });
  };

  render() {
    const disableLessButtons = { ...this.state.ingredients };
    const disableMoreButtons = { ...disableLessButtons };
    for (const key in disableLessButtons) {
      disableLessButtons[key] = disableLessButtons[key] <= 0;
      disableMoreButtons[key] = disableMoreButtons[key] >= 5;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients could not be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }
    if (this.state.loading) { orderSummary = <Spinner />; }

    return (
      <Aux>
        <Modal
          showModal={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHanlder(BurgerBuiler, axios);