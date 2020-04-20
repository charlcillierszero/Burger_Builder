import React from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import buttonTypes from '../../../constants/button-types';
import classes from './Form.module.css';

const form = props => {
  const formElementsArray = [];
  for (let key in props.formElements) { formElementsArray.push({ id: key, config: props.formElements[key] }); }

  return (
    <div className={classes.Form}>
      <h4>{props.formTitle}</h4>
      <form onSubmit={props.onSubmit}>
        {formElementsArray.map(formElement =>
          <Input
            key={formElement.id}
            {...formElement.config}
            changed={(event) => props.inputChanged(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
          />
        )}
        <Button buttonType={buttonTypes.Success} disabled={!props.formIsValid}>{props.buttonTitle}</Button>
      </form>
    </div>
  );
}

export default form;