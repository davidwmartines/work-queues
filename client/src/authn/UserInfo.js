import React, {Component} from 'react';
import AuthService from './auth-service';
import SignOut from './SignOut';

class UserInfo extends Component {

  shouldRender(){
    const state = AuthService.getAuthenticationState();
    return state.authenticated;
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
      <SignOut
        onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
      />
    );
  }
}

export default UserInfo;