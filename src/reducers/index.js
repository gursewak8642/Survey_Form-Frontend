// reducers/index.js
import { combineReducers } from 'redux';

// Import your reducers here
import userReducer from './userReducer'; // Assuming you have a userReducer

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

export default rootReducer;
