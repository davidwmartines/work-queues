import React, {Component} from 'react';
import AuthService from './auth-service';

class SignOut extends Component {

  onClick(e) {
    e.preventDefault();
    AuthService.signOut().then(() => {
      if (this.props.onAuthenticationChanged) {
        this.props.onAuthenticationChanged({
          authenticated: false
        });
      }
    });
  }

  render(){
    return (
      <a href="#signout" onClick={(e) => this.onClick(e)}>Sign Out</a>
    );
  }
}

export default SignOut;