import { combineReducers } from 'redux';
import authenticationReducer from './Authentication.reducer'

export default combineReducers({
    authentication: authenticationReducer
});