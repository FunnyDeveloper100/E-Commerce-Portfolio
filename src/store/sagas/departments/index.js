import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    GET_ALL_DEPARTMENTS,
    GET_ALL_DEPARTMENTS_SUCCESS,
    GET_DEPARTMENT,
    GET_DEPARTMENT_SUCCESS,
}
    from '../../actions/departments';
import departmentsSerice from '../../../services/departmentService';

function* getAllDepartmentsSaga(action) {
    try {
        const departments = yield call(departmentsSerice.getAllDepartments);
        yield put({ type: GET_ALL_DEPARTMENTS_SUCCESS, departments });
    } catch (error) {
        console.log(error);
    }
}

function* getDepartmentSaga(action) {
    try {
        const department = yield call(departmentsSerice.getDepartmentById, action.payload);
        yield put({ type: GET_DEPARTMENT_SUCCESS, department });
    } catch (error) {
        console.log(error);
    }
}

function* getAllDepartments() {
    yield takeLatest(GET_ALL_DEPARTMENTS, getAllDepartmentsSaga);
}

function* getDepartment() {
    yield takeLatest(GET_DEPARTMENT, getDepartmentSaga);
}

export default function* departmentsSaga() {
    yield all([
        getAllDepartments(),
        getDepartment(),
    ]);
}
