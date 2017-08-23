import React, {Component} from 'react';
import NativeCredentialsLogin from './NativeCredentialsLogin';
import {connect} from 'react-redux';

class AuthContainer extends Component {

  render(){
    if (!this.props.visible) {
      return null;
    }
    return (
      <NativeCredentialsLogin />
      // Potentially also show third part auth service login components here.
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visible: !state.authn.token
  };
};

export default connect(mapStateToProps)(AuthContainer);