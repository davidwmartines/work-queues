import {
  combineReducers
} from 'redux';

import * as appActions from './app-actions';
import * as authnActions from './authn/actions';

import workItems from './work-items/reducers';
import authn from './authn/reducers';

const app = (state = {
  submitting: false,
  message: null
}, action) => {

  switch (action.type) {
    case appActions.SUBMIT_START:
      return { ...state,
        submitting: true
      };
    case appActions.SUBMIT_END:
      return { ...state,
        submitting: false
      };

    case authnActions.LOGGING_IN:
    case authnActions.LOGGING_OUT:
      return { ...state,
        submitting: true,
        message: null
      };

    case authnActions.LOGGED_IN:
    case authnActions.LOGGED_OUT:
    case authnActions.LOGIN_ERROR:
      return { ...state,
        submitting: false,
        message: action.message
      };

    default:
      return state;
  }

};

const reducers = combineReducers({
  app,
  authn,
  workItems
});


export default reducers;