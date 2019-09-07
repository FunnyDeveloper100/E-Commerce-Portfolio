import { all } from 'redux-saga/effects';
import { registerSaga } from './authentication.saga';


export default function* customersSaga() {
    yield all([
        registerSaga(),
    ]);
}