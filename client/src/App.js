import React, { Component }  from 'react';
import './App.css';
import AuthContainer from './authn/AuthContainer';
import UserInfoContainer from './authn/UserInfoContainer';
import WebSocketClient from './WebSocketClient';
import {connect} from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.webSocketClient = new WebSocketClient({
      onReceive: this.onReceive
    });
  }

  onReceive(e, data){
    console.log(`App received event: ${e}`, data);
  }

  render() {
    if (this.props.authenticated) {
      this.webSocketClient.open();
    } else {
      this.webSocketClient.close();
    }
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

const mapStateToProps = (state) => {
  return {
    authenticated: !!state.authn.token
  };
};

export default connect(mapStateToProps)(App);
