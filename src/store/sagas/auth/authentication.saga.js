import { put, takeLatest, call } from 'redux-saga/effects';
import customerService from '../../../services/customerService';
import {
    REGISTER_CUSTOMER,
    REGISTER_CUSTOMER_SUCCESS,
    REGISTER_CUSTOMER_ERROR,
    LOGIN_CUSTOMER,
    LOGIN_CUSTOMER_SUCCESS,
    LOGIN_CUSTOMER_ERROR,
    LOGOUT_CUSTOMER,

    SET_CUSTOMER_FROM_TOKEN,
}
    from "../../actions/customers";

function* registerCustomer(action) {
    try {
        const customer = yield call(customerService.registerCustomerService, action.payload);
        
        yield put({ type: REGISTER_CUSTOMER_SUCCESS, customer });
    } catch (error) {
        yield put({ type: REGISTER_CUSTOMER_ERROR, error });
    }
}

function* loginCustomer(action) {
    try {
        const customer = yield call(customerService.loginCustomerService, action.payload);
        
        yield put({ type: LOGIN_CUSTOMER_SUCCESS, customer });
    } catch (error) {
        yield put({ type: LOGIN_CUSTOMER_ERROR, error })
    }
}

function* logoutCustomer() {
    try {
        yield call(customerService.logoutCustomer);
        yield put({type: LOGOUT_CUSTOMER});
    } catch (error) {
        console.log(error);
    }
}

function* setCustomerFromToken(action) {
    try {
        const customer = yield call(customerService.getCustomerByToken, action.payload);
        yield put({ type: LOGIN_CUSTOMER_SUCCESS, customer });
    } catch (error) {
        yield put({ type: LOGIN_CUSTOMER_ERROR, error })
    }
}

export function* registerSaga() {
    yield takeLatest(REGISTER_CUSTOMER, registerCustomer);
}

export function* loginSaga() {
    yield takeLatest(LOGIN_CUSTOMER, loginCustomer);
}

export function* logoutSaga() {
    yield takeLatest(LOGOUT_CUSTOMER, logoutCustomer);
}

export function* setCustomerFromTokenSaga() {
    yield takeLatest(SET_CUSTOMER_FROM_TOKEN, setCustomerFromToken);
}