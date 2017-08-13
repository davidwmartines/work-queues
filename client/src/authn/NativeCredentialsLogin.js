import React, {Component} from 'react';
import AuthService from './auth-service';

class NativeCredentialsLogin extends Component{

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    };
  }

  onSubmit(e){
    e.preventDefault();
    AuthService.loginNative(this.state.username, this.state.password);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    return (
      <div>
        <form>
          <div>
            <input 
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div>
            <input 
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password} 
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div>
            <input 
              type="submit" 
              value="Sign In" 
              onClick={(e) => this.onSubmit(e)}
            />
          </div>
        </form>
      </div>
    );
  }

}

export default NativeCredentialsLogin;