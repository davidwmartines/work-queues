import {
  combineReducers
} from 'redux';
import * as actions from './actions';

// authn reducers

const authReducer = (state = {
  submitting: false,
  token: null,
  user: null
}, action) => {
  switch (action.type) {

    case actions.LOGGING_IN:
    case actions.LOGGING_OUT:
      return { ...state,
        submitting: true
      };
      
    case actions.LOGGED_IN:
      return { ...state,
        submitting: false,
        user: action.user,
        token: action.token
      };

    case actions.LOGGED_OUT:
      return { ...state,
        submitting: false,
        user: null,
        token: null
      };

    default:
      return state;
  }
};


const authReducers = combineReducers({
  authReducer
});

export default authReducers;