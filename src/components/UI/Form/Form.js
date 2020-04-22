import React from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import classes from './Form.module.css';

const form = props => {
  const inputElementsArray = [];
  for (let key in props.inputElements) { inputElementsArray.push({ id: key, config: props.inputElements[key] }); }

  const buttonElementsArray = [];
  for (let key in props.buttons) { buttonElementsArray.push({ id: key, config: props.buttons[key] }); }

  const submitButton = (
    <Button
      buttonType={buttonElementsArray[0].config.buttonType}
      disabled={buttonElementsArray[0].config.disabled}
    >
      {buttonElementsArray[0].config.title}
    </Button>
  );

  return (
    <div className={classes.Form}>
      <h4>{props.formTitle}</h4>
      {props.errorMessage ? <p style={{ color: 'red' }}>{props.errorMessage}</p> : null}
      <form onSubmit={props.onSubmit}>
        {inputElementsArray.filter(a => !a.config.hidden).map(formElement =>
          <Input
            key={formElement.id}
            {...formElement.config}
            changed={(event) => props.inputChanged(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
          />
        )}
        {submitButton}
      </form>
      {buttonElementsArray.slice(1, buttonElementsArray.length).map(buttonElement =>
        <Button
          key={buttonElement.id}
          buttonType={buttonElement.config.buttonType}
          clicked={buttonElement.config.onClick}
          disabled={buttonElement.config.disabled}
        >
          {buttonElement.config.title}
        </Button>
      )}
    </div>
  );
}

export default form;