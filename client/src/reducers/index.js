import {
  combineReducers
} from 'redux';

import workItems from './work-items';
import authn from '../authn/reducers';

const reducers = combineReducers({
  authn,
  workItems
});


export default reducers;