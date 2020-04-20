import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Form from '../../components/UI/Form/Form';

import * as inputUtils from '../../components/UI/Input/utils';
import { inputSubTypes } from '../../constants/input-types';


class Auth extends Component {
  state = {
    controls: {
      email: inputUtils.createTextInput(inputSubTypes.EMAIL, 'Email', 'Email Address', inputUtils.emailRules),
      password: inputUtils.createTextInput(inputSubTypes.PASSWORD, 'Password', 'Password', inputUtils.passwordRules),
    },
    formIsValid: false,
    isValidated: false,
  }

  authHandler = (event) => {
    console.log(event.target);
    event.preventDefault();
    this.setState({ isValidated: true });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = { ...updatedControls[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = inputUtils.checkValidity(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedControls[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = formIsValid && updatedControls[inputIdentifier].valid;
    }

    this.setState({ controls: updatedControls, formIsValid });
  }

  render() {
    let form = (
      <Form
        formElements={this.state.controls}
        onSubmit={this.authHandler}
        inputChanged={this.inputChangedHandler}
        formIsValid={this.state.formIsValid}
        buttonTitle='SUBMIT'
        formTitle='Login'
      />
    );
    const validatedRedirect = this.state.isValidated ? <Redirect to='/' /> : null;

    return (
      <div>
        {validatedRedirect}
        {form}
      </div>
    );
  }
}

export default Auth;