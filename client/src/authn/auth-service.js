class AuthService {

  loginNative(username, password) {
    return fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((result) => {
          console.log('logged in', result.user.name);
          window.sessionStorage.setItem('token', result.token);

          //open websocket here...
          
          return true;
        });
      } else {
        return false;
      }
    });
  }
}

export default new AuthService();