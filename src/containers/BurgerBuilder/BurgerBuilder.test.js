import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuiler } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import ingredientTypes from '../../constants/ingredient-types';

configure({ adapter: new Adapter() });

describe('<BurgerNuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuiler initIngredients={() => { }} />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    const ingredients = {};
    ingredients[ingredientTypes.SALAD] = 0;
    wrapper.setProps({ ingredients });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});