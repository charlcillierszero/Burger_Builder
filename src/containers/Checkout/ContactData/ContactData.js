import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../components/UI/Form/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { inputSubTypes } from '../../../constants/input-types';
import * as inputUtils from '../../../components/UI/Input/utils';
import { deliveryMethods, defualtDeliveryOptions } from '../../../constants/delivery-methods';
import { orderActions } from '../../../containers/store/actions';

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
    formIsValid: false,
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
    this.props.purchaseBurger(order);
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

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    let form = (
      <Form
        formElements={this.state.orderForm}
        onSubmit={this.orderHandler}
        inputChanged={this.inputChangedHandler}
        formIsValid={this.state.formIsValid}
        buttonTitle='ORDER'
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));