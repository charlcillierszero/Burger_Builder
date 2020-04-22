import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../components/UI/Form/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { inputSubTypes } from '../../../constants/input-types';
import * as inputUtils from '../../../components/UI/Input/utils';
import { deliveryMethods, defualtDeliveryOptions } from '../../../constants/delivery-methods';
import { orderActions } from '../../../containers/store/actions';
import buttonTypes from '../../../constants/button-types';

class ContactData extends Component {
  state = {
    orderForm: {
      name: inputUtils.createTextInput(inputSubTypes.TEXT, 'Name', 'Your Name'),
      street: inputUtils.createTextInput(inputSubTypes.TEXT, 'Street', 'Street'),
      zipCode: inputUtils.createTextInput(inputSubTypes.TEXT, 'ZIP Code', 'ZIP Code', inputUtils.zipCodeRules),
      country: inputUtils.createTextInput(inputSubTypes.TEXT, 'Country', 'Country'),
      email: inputUtils.createTextInput(inputSubTypes.EMAIL, 'Email', 'Your Email', inputUtils.emailRules),
      deliveryMethod: inputUtils.createSelectInput(defualtDeliveryOptions, deliveryMethods.FASTEST.value),
    },
    formButtons: {
      submit: { buttonType: buttonTypes.Success, disabled: true, title: 'SUBMIT' },
    },
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    }
    this.props.purchaseBurger(order, this.props.token, this.props.userId);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = inputUtils.checkValidity(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
    }

    const updatedFormButtons = { ...this.state.formButtons };
    updatedFormButtons.submit = { ...updatedFormButtons.submit };
    updatedFormButtons.submit.disabled = !formIsValid;

    this.setState({
      orderForm: updatedOrderForm,
      formButtons: updatedFormButtons,
    });
  }

  render() {
    const errorMessage = this.props.error ? 'Order failed. Please try again.' : null;
    let form = (
      <Form
        errorMessage={errorMessage}
        inputElements={this.state.orderForm}
        buttons={this.state.formButtons}
        onSubmit={this.orderHandler}
        inputChanged={this.inputChangedHandler}
        formTitle='Enter your Contact Data'
      />
    );
    if (this.props.loading) { form = <Spinner />; }

    return form;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (orderData, token, userId) => dispatch(orderActions.purchaseBurger(orderData, token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);