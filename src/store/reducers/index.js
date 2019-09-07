import {combineReducers} from 'redux';
import alerts from './alerts';
import products from './products';
import product from './product';
import customers from './customers';

const createReducer = (asyncReducers) =>
    combineReducers({
        alerts,
        customers,
        products,
        product,
        ...asyncReducers
    });

export default createReducer;
