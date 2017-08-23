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


    // const {store} = this.context;
    // console.log('state', store.getState());
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

//TODO: remove when we migrate to using connect.
App.contextTypes = { store: React.PropTypes.object };

export default App;
