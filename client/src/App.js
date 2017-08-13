import React, { Component }  from 'react';
import './App.css';
import NativeCredentialsLogin from './authn/NativeCredentialsLogin';

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

    let content = '';

    if(!this.state.authenticated){
      content = (
        <NativeCredentialsLogin
          onAuthenticationChanged={(event) => this.onAuthenticationChanged(event)}
        />
      );
    } else {
      content = '';
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Work Queues</h2>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
