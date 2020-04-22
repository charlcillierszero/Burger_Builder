import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from '../../components/UI/Form/Form';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as inputUtils from '../../components/UI/Input/utils';
import { inputSubTypes } from '../../constants/input-types';
import { authActions } from '../store/actions';
import buttonTypes from '../../constants/button-types';

class Auth extends Component {
  state = {
    controls: {
      email: inputUtils.createTextInput(inputSubTypes.EMAIL, 'Email', 'Email Address', inputUtils.emailRules),
      password: {
        ...inputUtils.createTextInput(
          inputSubTypes.PASSWORD,
          'Password',
          'Password',
          inputUtils.passwordRules
        ),
        isPassword: true
      },
      passwordConfirm: {
        ...inputUtils.createTextInput(
          inputSubTypes.PASSWORD,
          'Password Confirm',
          'Password',
          inputUtils.passwordRules
        ),
        isConfirmPassword: true
      },
    },
    formButtons: {
      submit: { buttonType: buttonTypes.Success, disabled: true, title: 'SUBMIT' },
      authChange: { buttonType: buttonTypes.Danger, disabled: false, title: 'Sign-in' }
    },
    formIsValid: false,
    isSignUp: true,
    isSubmitButtonPressed: false,
    isInvalidPassword: false
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  authHandler = (event) => {
    event.preventDefault();

    if (this.state.isSignUp && !inputUtils.checkValidPassword(this.state.controls.password.value)) {
      this.setState({ isInvalidPassword: true });
    } else {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp,
      );
    }
  }

  checkFormValidaty = controls => {
    let formIsValid = true;
    for (let inputIdentifier in controls) {
      formIsValid = formIsValid && controls[inputIdentifier].valid;
    }
    return formIsValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = { ...updatedControls[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    if (updatedFormElement.isPassword) {
      const passwordConfirmFormElement = { ...updatedControls.passwordConfirm };
      passwordConfirmFormElement.valid = !this.state.isSignUp || updatedControls.password.value === updatedFormElement.value;
      updatedControls.passwordConfirm = passwordConfirmFormElement;
    }
    const isValidInput = inputUtils.checkValidity(event.target.value, updatedFormElement.validation);
    const validConfirmPassword = updatedFormElement.isConfirmPassword ?
      !this.state.isSignUp || updatedControls.password.value === updatedFormElement.value : true;
    updatedFormElement.valid = isValidInput && validConfirmPassword;
    updatedFormElement.touched = true;
    updatedControls[inputIdentifier] = updatedFormElement;

    let formIsValid = this.checkFormValidaty(updatedControls);
    const updatedFormButtons = { ...this.state.formButtons };
    updatedFormButtons.submit = { ...updatedFormButtons.submit };
    updatedFormButtons.submit.disabled = !formIsValid;

    this.setState({
      controls: updatedControls,
      formButtons: updatedFormButtons,
      formIsValid,
    });
  }

  switchAuthModeHandler = () => this.setState(prevState => ({
    isSignUp: !prevState.isSignUp,
    controls: {
      ...prevState.controls,
      passwordConfirm: {
        ...prevState.controls.passwordConfirm,
        hidden: prevState.isSignUp ? true : false,
        valid: prevState.isSignUp ?
          true :
          prevState.controls.passwordConfirm.value === prevState.controls.password.value,
        touched: prevState.isSignUp ?
          false :
          prevState.controls.passwordConfirm.value.length > 0
      }
    },
    formButtons: {
      ...prevState.formButtons,
      submit: {
        ...prevState.formButtons.submit,
        disabled: (() => {
          const updatedControls = { ...prevState.controls };
          const updatedPasswordConfirm = { ...updatedControls.passwordConfirm };
          updatedPasswordConfirm.valid = prevState.isSignUp ? true :
            prevState.controls.passwordConfirm.value === prevState.controls.password.value;
          updatedControls.passwordConfirm = updatedPasswordConfirm;
          return !this.checkFormValidaty(updatedControls);
        })()
      },
      authChange: {
        ...prevState.formButtons.authChange,
        title: !prevState.isSignUp ? 'Sign-up' : 'Sing-in'
      }
    }
  }));

  render() {
    const formButtons = { ...this.state.formButtons };
    formButtons.authChange.onClick = this.switchAuthModeHandler;

    const method = this.state.isSignUp ? 'Sign-up' : 'Sing-in';
    let errorMessage = null;
    errorMessage = this.props.error ? `Could not ${method.toLowerCase()}. Please try again.` : errorMessage;
    errorMessage = this.state.isInvalidPassword ?
      'Invalid password format. Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 of !@#$%^&*' :
      errorMessage;

    let form = (
      <div>
        <Form
          errorMessage={errorMessage}
          inputElements={this.state.controls}
          buttons={this.state.formButtons}
          onSubmit={this.authHandler}
          inputChanged={this.inputChangedHandler}
          formTitle={method}
        />
      </div>
    );
    if (this.props.loading) { form = <Spinner /> }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div>
        {authRedirect}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);