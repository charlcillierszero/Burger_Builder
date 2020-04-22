import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import { authActions } from './containers/store/actions';

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/auth' exact component={asyncAuth} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/auth' exact component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onAutoSignUp: () => dispatch(authActions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
