import React, {Component} from 'react';
import AuthService from './auth-service';
import NativeCredentialsLogin from './NativeCredentialsLogin';

class AuthContainer extends Component {

  shouldRender(){
    const state = AuthService.getAuthenticationState();
    return !state.authenticated;
  }

  onAuthenticationChanged(e){
    if (this.props.onAuthenticationChanged) {
      this.props.onAuthenticationChanged(e);
    }
  }

  render(){
    if(!this.shouldRender()){
      return null;
    }
    return (
      <NativeCredentialsLogin
        onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
      />
      // Potentially also show third part auth service login components here.
    );
  }
}

//TODO: remove when we migrate to using connect.
AuthContainer.contextTypes = { store: React.PropTypes.object };

export default AuthContainer;