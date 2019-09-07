import {combineReducers} from 'redux';
import auth from './customers.reducer';

const customers = combineReducers({
    auth
});

export default customers;