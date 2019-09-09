import { put } from 'redux-saga/effects';
import {
    LOAD_CART,
    ADD_PRODUCT,
    REMOVE_PRODUCT
}
    from '../../actions/cart';

export function* loadCartSaga(action) {
    try {
        yield put({ type: LOAD_CART, action });
    } catch (error) {
        console.log(error);
    }
}

export function* addProductSaga(action) {
    try {
        yield put({ type: ADD_PRODUCT, action });
    } catch (error) {
        console.log(error);
    }
}

export function* removeProductSaga(action) {
    try {
        yield put({ type: REMOVE_PRODUCT, action });
    } catch (error) {
        console.log(error);
    }
}