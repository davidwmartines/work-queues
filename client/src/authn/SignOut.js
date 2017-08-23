import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

class SignOut extends Component {

  onClick(e) {
    e.preventDefault();
    this.props.dispatch(actions.logout());
  }

  render(){
    return (
      <a href="#signout" onClick={(e) => this.onClick(e)}>Sign Out</a>
    );
  }
}

export default connect()(SignOut);