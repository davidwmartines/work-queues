import * as actions from './actions';

// authn reducers

const authn = (state = {
  token: null,
  user: null
}, action) => {
  switch (action.type) {

    case actions.LOGGED_IN:
      return { ...state,
        user: action.user,
        token: action.token
      };

    case actions.LOGGED_OUT:
      return { ...state,
        user: null,
        token: null
      };

    default:
      return state;
  }
};

export default authn;