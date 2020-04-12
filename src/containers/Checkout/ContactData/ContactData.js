import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';
import buttonTypes from '../../../constants/button-types';
import axios from '../../../axios-orders';
import { inputSubTypes } from '../../../constants/input-types';
import {
  createTextInput,
  createSelectInput,
  defaultRules,
  zipCodeRules,
} from './util';
import { deliveryMethods, defualtDeliveryOptions } from '../../../constants/delivery-methods';

class ContactData extends Component {
  state = {
    orderForm: {
      name: createTextInput(inputSubTypes.TEXT, 'Name', 'Your Name', defaultRules),
      street: createTextInput(inputSubTypes.TEXT, 'Street', 'Street', defaultRules),
      zipCode: createTextInput(inputSubTypes.TEXT, 'ZIP Code', 'ZIP Code', zipCodeRules),
      country: createTextInput(inputSubTypes.TEXT, 'Country', 'Country', defaultRules),
      email: createTextInput(inputSubTypes.EMAIL, 'Email', 'Your Email', defaultRules),
      deliveryMethod: createSelectInput(defualtDeliveryOptions, deliveryMethods.FASTEST.value),
    },
    formIsValid: false,
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));
  }

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }

    const trimmedValue = value.trim();
    let isValid = true;

    if (rules.required) {
      isValid = isValid && trimmedValue !== '';
    }

    if (rules.minLength) {
      isValid = isValid && trimmedValue.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && trimmedValue.length <= rules.maxLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement =>
          <Input
            key={formElement.id}
            label={formElement.config.label}
            {...formElement.config}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        )}
        <Button buttonType={buttonTypes.Success} disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) { form = <Spinner />; }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;