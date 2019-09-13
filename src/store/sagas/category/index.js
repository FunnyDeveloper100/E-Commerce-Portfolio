import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    GET_ALL_CATEGORIES,
    GET_ALL_CATEGORIES_SUCCESS,

    GET_SINGLE_CATEGORY,
    GET_SINGLE_CATEGORY_SUCCESS,

    GET_CATEGORIES_IN_DEPARTMENT,
    GET_CATEGORIES_IN_DEPARTMENT_SUCCESS,

    GET_CATEGORIES_IN_PRODUCT,
    GET_CATEGORIES_IN_PRODUCT_SUCCESS,
}
    from '../../actions/category';
import categorySerice from '../../../services/categoryService';

function* getAllCategoriesSaga(action) {
    try {
        const categories = yield call(categorySerice.getAllCategories);
        yield put({ type: GET_ALL_CATEGORIES_SUCCESS, categories });
    } catch (error) {
        console.log(error);
    }
}

function* getSingleCategorySaga(action) {
    try {
        const category = yield call(categorySerice.getCategoryById, action.payload);
        yield put({ type: GET_SINGLE_CATEGORY_SUCCESS, category });
    } catch (error) {
        console.log(error);
    }
}

function* getCategoriesInDepartmentSaga(action) {
    try {
        const categories = yield call(categorySerice.getCategoryInDepartment, action.payload);
        yield put({ type: GET_CATEGORIES_IN_DEPARTMENT_SUCCESS, categories });
    } catch (error) {
        console.log(error);
    }
}

function* getCategoriesInProductSaga(action) {
    try {
        const categories = yield call(categorySerice.getCategoryInProduct, action.payload);
        yield put({ type: GET_CATEGORIES_IN_PRODUCT_SUCCESS, categories });
    } catch (error) {
        console.log(error);
    }
}

function* getAllCategories() {
    yield takeLatest(GET_ALL_CATEGORIES, getAllCategoriesSaga);
}

function* getSingleCategory() {
    yield takeLatest(GET_SINGLE_CATEGORY, getSingleCategorySaga);
}

function* getCategoriesInDepartment() {
    yield takeLatest(GET_CATEGORIES_IN_DEPARTMENT, getCategoriesInDepartmentSaga);
}

function* getCategoriesInProduct() {
    yield takeLatest(GET_CATEGORIES_IN_PRODUCT, getCategoriesInProductSaga);
}

export default function* cartegorySaga() {
    yield all([
        getAllCategories(),
        getSingleCategory(),
        getCategoriesInDepartment(),
        getCategoriesInProduct(),
    ]);
}
