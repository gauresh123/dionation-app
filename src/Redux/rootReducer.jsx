import { combineReducers } from 'redux';
import eventReducer from './../Redux/Reducers/eventReducer'; 
import adminReducer from './../Redux/Reducers/adminReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  admin: adminReducer, 
});

export default rootReducer;
