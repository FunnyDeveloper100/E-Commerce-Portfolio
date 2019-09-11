import {combineReducers} from 'redux';
import alerts from './alerts';
import products from './products';
import product from './product';
import customers from './customers';
import cart from './cart';
import departments from './departments';
import category from './category';
import filters from './filters';

const createReducer = (asyncReducers) =>
    combineReducers({
        alerts,
        customers,
        products,
        product,
        cart,
        departments,
        category,
        filters,
        ...asyncReducers
    });

export default createReducer;
