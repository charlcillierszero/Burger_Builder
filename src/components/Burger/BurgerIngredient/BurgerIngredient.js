import React from 'react';

import classes from './BurgerIngredient.module.css';
import ingredientTypes, { ingredientTypesPropTypeChecker } from '../../../constants/ingredient-types';

const burgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case ingredientTypes.BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom} />;
      break;
    case ingredientTypes.BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case ingredientTypes.MEAT:
      ingredient = <div className={classes.Meat} />;
      break;
    case ingredientTypes.CHEESE:
      ingredient = <div className={classes.Cheese} />;
      break;
    case ingredientTypes.SALAD:
      ingredient = <div className={classes.Salad} />;
      break;
    case ingredientTypes.BACON:
      ingredient = <div className={classes.Bacon} />;
      break;
    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: ingredientTypesPropTypeChecker
}

export default burgerIngredient;
