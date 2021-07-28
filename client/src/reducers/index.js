import { combineReducers } from 'redux';
import { userReducer } from './userReducer';


//This is the main reducer that combine all  into it.

const rootReducer = combineReducers({
    user: userReducer,
});
export default rootReducer;