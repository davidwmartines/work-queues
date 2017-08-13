import React, { Component }  from 'react';
import './App.css';
import AuthContainer from './authn/AuthContainer';
import UserInfoContainer from './authn/UserInfoContainer';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if(window.sessionStorage.getItem('token')){
      this.setState({authenticated: true});
    }
  }

  onAuthenticationChanged(e){
    this.setState({authenticated: e.authenticated});
  }

  render() {
    console.log('app rendering', this.state);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Work Queues</h2>
        </div>
        <UserInfoContainer
          onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
        />
        <AuthContainer
          onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
        />
      </div>
    );
  }
}

export default App;
