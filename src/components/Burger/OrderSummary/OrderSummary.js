import React from 'react';

import Aux from '../../../hoc/Auxiliry/Auxiliry';
import Button from '../../UI/Button/Button';

import buttonType from '../../../constants/button-type';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
      );
    })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        buttonType={buttonType.Danger}
        clicked={props.purchaseCancelled}
      >
        CANCEL
      </Button>
      <Button
        buttonType={buttonType.Success}
        clicked={props.purchaseContinued}
      >
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;