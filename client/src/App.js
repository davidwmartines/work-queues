import React, { Component }  from 'react';
import './App.css';
import NativeCredentialsLogin from './authn/NativeCredentialsLogin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Work Queues</h2>
        </div>
        <NativeCredentialsLogin/>
      </div>
    );
  }
}

export default App;
