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

  getUser(){
    if (window.sessionStorage.getItem('user')){
      return JSON.parse(window.sessionStorage.getItem('user'));
    }
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
            window.sessionStorage.setItem('user', JSON.stringify(result.user));
            return true;
          });
        } else {
          return false;
        }
      });
  }
}

export default new AuthService();