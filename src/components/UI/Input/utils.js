import inputTypes from '../../../constants/input-types';

export const emptyRules = {};
export const defaultRules = { required: true, minLength: 1, maxLength: 50 };
export const zipCodeRules = { ...defaultRules, minLength: 5, maxLength: 5, isNumeric: true };
export const emailRules = { ...defaultRules, isEmail: true };
export const passwordRules = { ...defaultRules, isValidPassword: true };

const numericRegex = /^\d+$/;
const emailRegex = /([\w]+)(((\.)([\w]+))*)@([\w]+)(\.([\w]+))(((\.)([\w]+))*)/;
// eslint-disable-next-line
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[\w!@#\$%\^&\*]{8,16}/;

export const checkValidity = (value, rules) => {
  if (!rules) { return true; }

  const trimmedValue = value.trim();
  let isValid = true;

  if (rules.required) { isValid = isValid && trimmedValue !== ''; }
  if (rules.minLength) { isValid = isValid && trimmedValue.length >= rules.minLength; }
  if (rules.maxLength) { isValid = isValid && trimmedValue.length <= rules.maxLength; }
  if (rules.isNumeric) { isValid = isValid && numericRegex.test(trimmedValue); }
  if (rules.isEmail) { isValid = isValid && emailRegex.test(trimmedValue); }
  if (rules.isValidPassword) { isValid = isValid && passwordRegex.test(trimmedValue); }

  return isValid;
}

export const createTextInput = (type, label, placeholder, validation = defaultRules) => {
  return {
    elementType: inputTypes.INPUT,
    label,
    elementConfig: { type, placeholder },
    value: '',
    validation,
    valid: false,
    touched: false,
  };
}

export const createSelectInput = (options, value) => {
  return {
    elementType: inputTypes.SELECT,
    elementConfig: { options },
    value,
    validation: emptyRules,
    valid: true,
  };
}