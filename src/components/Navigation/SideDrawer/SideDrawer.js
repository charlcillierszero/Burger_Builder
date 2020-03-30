import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliry/Auxiliry';

import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  const attachedClasses = [classes.SideDrawer];
  props.isSideDrawerOpen ? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close);

  return (
    <Aux>
      <Backdrop
        showBackdrop={props.isSideDrawerOpen}
        clicked={props.closeSideDrawer}
      />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;