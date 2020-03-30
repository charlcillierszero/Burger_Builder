import React, { Component } from 'react';

import Aux from '../Auxiliry/Auxiliry';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });
  toggleSideDrawerHandler = () => this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render() {
    return (
      <Aux>
        <Toolbar
          toggleSideDrawer={this.toggleSideDrawerHandler}
        />
        <SideDrawer
          closeSideDrawer={this.sideDrawerClosedHandler}
          isSideDrawerOpen={this.state.showSideDrawer}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;