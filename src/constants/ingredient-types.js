const ingredientTypes = {
  BREAD_TOP: 'bread-top',
  BREAD_BOTTOM: 'bread-bottom',
  MEAT: 'meat',
  CHEESE: 'cheese',
  SALAD: 'salad',
  BACON: 'bacon'
};

const ingredientTypesValues = Object.values(ingredientTypes);
const ingredientTypesPropTypeChecker = (props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS';
  if (!ingredientTypesValues.includes(props[propName])) {
    return new Error(`${propName} in ${componentName} must be one of ${JSON.stringify(ingredientTypesValues)}`)
  }
}

export default ingredientTypes;

export {
  ingredientTypes,
  ingredientTypesPropTypeChecker
}