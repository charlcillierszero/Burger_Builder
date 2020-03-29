import React from 'react';

import Aux from '../../../hoc/Auxiliry/Auxiliry';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = props => (
  <Aux>
    <Backdrop
      showBackdrop={props.showModal}
      clicked={props.closeModal}
    />
    <div
      className={classes.Modal}
      style={{
        transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.showModal ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default React.memo(modal);