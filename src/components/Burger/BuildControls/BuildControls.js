import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

import controls from '../../../constants/ingredient-controls';

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current prince: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        disableLess={props.disableLessButtons[control.type]}
        disableMore={props.disableMoreButtons[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
    >ORDER NOW!</button>
  </div>
);

export default buildControls;