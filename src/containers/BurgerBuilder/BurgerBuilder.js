import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliry';
import Burger from '../../components/Burger/Burger';

class BurgerBuiler extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build conrtols</div>
      </Aux>
    );
  }
}

export default BurgerBuiler;