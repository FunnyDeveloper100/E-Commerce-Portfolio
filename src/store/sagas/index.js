import {all} from 'redux-saga/effects';
import customersSaga from './auth';
import productsSaga from './products';
import productSaga from './product';

export default function* rootSaga() {
    yield all([
        customersSaga(),
        productsSaga(),
        productSaga(),
    ]);
}
