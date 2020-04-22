import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authActions } from '../../store/actions';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authActions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);