import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import { burgerBuilderActions, orderActions } from '../store/actions';

import Aux from '../../hoc/Auxiliry/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuiler extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() { this.props.initIngredients(); }

  purchaseHandler = () => this.setState({ purchasing: true });
  purchaseCancelHandler = () => this.setState({ purchasing: false });
  purchaseContinueHandler = () => {
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disableLessButtons = { ...this.props.ingredients };
    const disableMoreButtons = { ...disableLessButtons };
    for (const key in disableLessButtons) {
      disableLessButtons[key] = disableLessButtons[key] <= 0;
      disableMoreButtons[key] = disableMoreButtons[key] >= 5;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients could not be loaded!</p> : <Spinner />;
    if (this.props.ingredients) {
      const purchasable = Object.values(this.props.ingredients).reduce((total, next) => total + next, 0) > 0;
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disableLessButtons={disableLessButtons}
            disableMoreButtons={disableMoreButtons}
            price={this.props.totalPrice}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    addIngredient: (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
    removeIngredient: (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
    purchaseInit: () => dispatch(orderActions.purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuiler, axios));