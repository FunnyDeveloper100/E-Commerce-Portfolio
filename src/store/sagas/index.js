import {all} from 'redux-saga/effects';
import customersSaga from './auth';
import productsSaga from './products';
import productSaga from './product';
import cartSaga from './cart';
import departmentsSaga from './departments';
import cartegorySaga from './category';
import updateFilterSaga from './filter';

export default function* rootSaga() {
    yield all([
        customersSaga(),
        productsSaga(),
        productSaga(),
        cartSaga(),
        departmentsSaga(),
        cartegorySaga(),
        updateFilterSaga(),
    ]);
}
