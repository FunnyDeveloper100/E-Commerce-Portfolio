import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    LOAD_CART,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_SUCCESS,
}
    from '../../actions/cart';

function* loadCartSaga(action) {
    try {
        yield put(action);
    } catch (error) {
        console.log(error);
    }
}

function* addProductSaga(action) {
    try {
        yield put({ type: ADD_PRODUCT_SUCCESS, payload: action.payload });
    } catch (error) {
        console.log(error);
    }
}

function* removeProductSaga(action) {
    try {
        yield put({ type: REMOVE_PRODUCT_SUCCESS, payload: action.payload });
    } catch (error) {
        console.log(error);
    }
}

export function* loadCartWatcher() {
    yield takeLatest(LOAD_CART, loadCartSaga);
}

export function* addProductWatcher() {
    yield takeEvery(ADD_PRODUCT, addProductSaga);
}

export function* removeProductWatcher() {
    yield takeEvery(REMOVE_PRODUCT, removeProductSaga);
}