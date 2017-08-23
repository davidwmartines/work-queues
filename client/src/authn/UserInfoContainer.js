import React, {Component} from 'react';
import SignOut from './SignOut';
import UserInfo from './UserInfo';
import {connect} from 'react-redux';

class UserInfoContainer extends Component {
  
  render(){
    if(!this.props.visible){
      return null;
    }
    return (
      <div>
        <UserInfo user={this.props.user} />
        <SignOut/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visible: !!state.authn.token,
    user: state.authn.user
  };
};

export default connect(mapStateToProps)(UserInfoContainer);