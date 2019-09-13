import { all } from 'redux-saga/effects';
import { registerSaga, loginSaga,  setCustomerFromTokenSaga, } from './authentication.saga';


export default function* customersSaga() {
    yield all([
        registerSaga(),
        loginSaga(),
        setCustomerFromTokenSaga(),
    ]);
}