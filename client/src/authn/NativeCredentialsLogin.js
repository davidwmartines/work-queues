import React, {Component} from 'react';
import AuthService from './auth-service';

class NativeCredentialsLogin extends Component{

  constructor(props){
    super(props);
    this.state = {
      submitting: false,
      message: '',
      username:'',
      password:''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      submitting: true,
      message: ''
    });
    AuthService.loginNative(this.state.username, this.state.password)
      .then((result) => {
        this.setState({
          submitting: false
        });
        if (result) {
          this.setState({
            username: '',
            password: '',
            message: ''
          });
          if (this.props.onAuthenticationChanged) {
            this.props.onAuthenticationChanged({
              authenticated: true
            });
          }
        } else {
          this.setState({
            message: 'try again'
          });
        }
      });
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    const {username, password, message} = this.state;
    const disabled = this.state.submitting ? 'disabled': '';
    return (
      <div>
        <form>
          <div>
            <input 
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div>
            <input 
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => this.onChange(e)}
            />
          </div>
          <div>
            <input 
              type="submit" 
              value="Sign In" 
              onClick={(e) => this.onSubmit(e)}
              disabled = {disabled}
            />
          </div>
          <div>
            <span>{message}</span>
          </div>
        </form>
      </div>
    );
  }

}

export default NativeCredentialsLogin;