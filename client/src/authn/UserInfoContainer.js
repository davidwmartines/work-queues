import React, {Component} from 'react';
import AuthService from './auth-service';
import SignOut from './SignOut';
import UserInfo from './UserInfo';

class UserInfoContainer extends Component {

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
    const user = AuthService.getUser();
    return (
      <div>
        <UserInfo user={user} />
        <SignOut
          onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
        />
      </div>
    );
  }
}

//TODO: remove when we migrate to using connect.
UserInfoContainer.contextTypes = { store: React.PropTypes.object };

export default UserInfoContainer;