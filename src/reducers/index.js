import { combineReducers } from "redux";
import { reducer as forms } from 'redux-form';
import listReducer from './listReducer';

export default combineReducers({
    form: forms,
    list: listReducer
});
