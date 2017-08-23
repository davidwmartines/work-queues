import {
  post,
  del
} from '../http';

export const LOGIN = 'LOGIN';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGGING_OUT = 'LOGGING_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';

export const loggingIn = () =>
  ({
    type: LOGGING_IN
  });

export const loggedIn = (user, token) =>
  ({
    type: LOGGED_IN,
    user: user,
    token: token
  });

export const loginError = (message) =>
  ({
    type: LOGIN_ERROR,
    message: message
  });

export const loggingOut = () =>
  ({
    type: LOGGING_OUT
  });

export const loggedOut = () =>
  ({
    type: LOGGED_OUT
  });

export const login = (credentials) => {

  return function (dispatch) {
    dispatch(loggingIn());

    const {
      username,
      password
    } = credentials;
    return post('api/tokens', {
      username,
      password
    }).then((res) => {
      if (res.ok) {
        return res.json()
          .then((val) => {
            console.log('logged in', val.user.name);

            //store these in session to handle page reloads ?
            // actually, really should persists entire state store
            window.sessionStorage.setItem('token', val.token);
            window.sessionStorage.setItem('user', JSON.stringify(val.user));

            dispatch(loggedIn(val.user, val.token));
          });
      } else {
        dispatch(loginError('Invalid credentials.  Please try again.'));
      }
    }, (err) => {
      dispatch(loginError(err));
    });
  };
};

export const logout = () => {
  return function (dispatch) {
    dispatch(loggingOut());
    return del('api/tokens')
      .then(() => {
        console.log('logged out');
        window.sessionStorage.clear();
        dispatch(loggedOut());
      });
  };
};