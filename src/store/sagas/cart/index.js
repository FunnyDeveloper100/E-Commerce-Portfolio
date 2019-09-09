import { all } from 'redux-saga/effects';
import { loadCartSaga, addProductSaga, removeProductSaga } from './cart.saga';


export default function* cartSaga() {
    yield all([
        loadCartSaga(),
        addProductSaga(),
        removeProductSaga(),
    ]);
}