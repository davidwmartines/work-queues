import React, { Component }  from 'react';
import './App.css';
import AuthContainer from './authn/AuthContainer';
import AuthService from './authn/auth-service';
import UserInfoContainer from './authn/UserInfoContainer';
import WebSocketClient from './WebSocketClient';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.webSocketClient = new WebSocketClient({
      onReceive: this.onReceive
    });
  }

  onReceive(e, data){
    console.log(`App received event: ${e}`, data);
  }

  componentDidMount() {
    const authState = AuthService.getAuthenticationState();
    if (authState.authenticated) {
      if (!this.state.authenticated) {
        this.setState({
          authenticated: true
        });
      }
      this.webSocketClient.ensure();
    }
  }

  onAuthenticationChanged(e) {
    this.setState({
      authenticated: e.authenticated
    });
    if (e.authenticated) {
      this.webSocketClient.open();
    } else {
      this.webSocketClient.close();
    }
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
