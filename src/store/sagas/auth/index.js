import { all } from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authentication.saga';


export default function* customersSaga() {
    yield all([
        registerSaga(),
        loginSaga(),
    ]);
}