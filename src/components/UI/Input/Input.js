import React from 'react';

import inputTypes from '../../../constants/input-types';
import classes from './Input.module.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid value for <i>{props.label}</i>
      </p>
    );
  }

  switch (props.elementType) {
    case inputTypes.INPUT:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case inputTypes.TEXT_AREA:
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case inputTypes.SELECT:
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option =>
            <option
              key={option.value}
              value={option.value}
            >{option.displayValue}</option>
          )}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default input;