import { put, all } from 'redux-saga/effects';
import {
    UPDATE_FILTER
}
    from '../../actions/filters';

function* updateFilter(action) {
    try {
        yield put({ type: UPDATE_FILTER, action });
    } catch (error) {
        console.log(error);
    }
}

export default function* updateFilterSaga() {
    yield all([
        updateFilter(),
    ]);
}
