import { all } from 'redux-saga/effects';
import { loadCartWatcher, addProductWatcher, removeProductWatcher } from './cart.saga';


export default function* cartSaga() {
    yield all([
        loadCartWatcher(),
        addProductWatcher(),
        removeProductWatcher(),
    ]);
}