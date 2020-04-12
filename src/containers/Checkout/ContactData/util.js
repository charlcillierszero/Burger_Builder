import inputTypes from '../../../constants/input-types';

const emptyRules = {};

const defaultRules = {
  required: true,
};

const zipCodeRules = {
  ...defaultRules,
  minLength: 5,
  maxLength: 5,
}

const createTextInput = (type, label, placeholder, validation) => {
  return {
    elementType: inputTypes.INPUT,
    label,
    elementConfig: {
      type,
      placeholder,
    },
    value: '',
    validation,
    valid: false,
    touched: false,
  };
}

const createSelectInput = (options, value) => {
  return {
    elementType: inputTypes.SELECT,
    elementConfig: { options },
    value,
    validation: emptyRules,
    valid: true,
  };
}

export {
  createTextInput,
  createSelectInput,

  emptyRules,
  defaultRules,
  zipCodeRules,
}