import {
  post,
  del
} from '../http';

class AuthService {

  getAuthenticationState() {
    const tokenExists = window.sessionStorage.getItem('token');
    return {
      authenticated: tokenExists
    };
  }

  signOut() {
    return del('api/tokens')
      .then(() => {
        window.sessionStorage.clear();
      });
  }

  loginNative(username, password) {
    return post('api/tokens', {
      username,
      password
    })
      .then((res) => {
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