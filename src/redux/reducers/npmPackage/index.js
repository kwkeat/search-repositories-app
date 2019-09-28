import { combineReducers } from 'redux';
import suggestions from './suggestions';
import info from './info';

export default combineReducers({
  suggestions,
  info,
});
