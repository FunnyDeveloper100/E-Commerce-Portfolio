import { put, call, all } from 'redux-saga/effects';
import {
    GET_ALL_DEPARTMENTS,
    GET_DEPARTMENT
}
    from '../../actions/departments';
import departmentsSerice from '../../../services/departmentService';

function* getDepartmentsSaga(action) {
    try {
        const departments = yield call(departmentsSerice.getAllDepartments);
        yield put({ type: GET_ALL_DEPARTMENTS, departments });
    } catch (error) {
        console.log(error);
    }
}

function* getDepartmentSaga(action) {
    try {
        const department = yield call(departmentsSerice.getDepartmentById, action.department_id);
        yield put({ type: GET_DEPARTMENT, department });
    } catch (error) {
        console.log(error);
    }
}

export default function* departmentsSaga() {
    yield all([
        getDepartmentsSaga(),
        getDepartmentSaga(),
    ]);
}
