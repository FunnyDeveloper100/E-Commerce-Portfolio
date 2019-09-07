import { put, takeLatest, call } from 'redux-saga/effects';
import customerService from '../../../services/customerService';
import {
    REGISTER_CUSTOMER,
    REGISTER_CUSTOMER_SUCCESS,
    REGISTER_CUSTOMER_ERROR,
    LOGIN_CUSTOMER,
    LOGIN_CUSTOMER_SUCCESS,
    LOGIN_CUSTOMER_ERROR
}
    from "../../actions/customers";

function* registerCustomer(action) {
    try {
        const response = yield call(customerService.registerCustomerService, action.payload);
        yield put({ type: REGISTER_CUSTOMER_SUCCESS, response });
    } catch (error) {
        yield put({ type: REGISTER_CUSTOMER_ERROR, error });
    }
}

export function* registerSaga() {
    yield takeLatest(REGISTER_CUSTOMER, registerCustomer)
}

//   export function* loginSaga(payload) {
//     try {
//       const response = yield call(loginUserService, payload);
//       yield [
//         put({ type: LOGIN_CUSTOMER_SUCCESS, response })
//       ];
//     } catch(error) {
//       yield put({ type: LOGIN_CUSTOMER_ERROR, error })
//     }
//   }