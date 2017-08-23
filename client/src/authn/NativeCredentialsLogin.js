import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

class NativeCredentialsLogin extends Component{

  render(){
    const disabled = this.props.submitting ? 'disabled': '';
    let username, password;
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          const credentials = {
            username: username.value,
            password: password.value
          };
          this.props.dispatch(actions.login(credentials));
        }}>
          <div>
            <input 
              type="text"
              name="username"
              placeholder="username"
              value={username}
              ref = {node => username = node}
            />
          </div>
          <div>
            <input 
              type="password"
              name="password"
              placeholder="password"
              value={password}
              ref = {node => password = node}
            />
          </div>
          <div>
            <input 
              type="submit" 
              value="Sign In" 
              disabled = {disabled}
            />
          </div>
          <div>
            <span>{this.props.message}</span>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.app.message,
    submitting: state.app.submitting
  };
};

export default connect(mapStateToProps)(NativeCredentialsLogin);