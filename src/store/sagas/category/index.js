import { put, call, all } from 'redux-saga/effects';
import {
    GET_ALL_CATEGORIES,
    GET_SINGLE_CATEGORY,
    GET_CATEGORIES_IN_DEPARTMENT,
    GET_CATEGORIES_IN_PRODUCT
}
    from '../../actions/category';
import categorySerice from '../../../services/categoryService';

function* getAllCategoriesSaga(action) {
    try {
        const categories = yield call(categorySerice.getAllCategories);
        yield put({ type: GET_ALL_CATEGORIES, categories });
    } catch (error) {
        console.log(error);
    }
}

function* getSingleCategorySaga(action) {
    try {
        const category = yield call(categorySerice.getCategoryById, action.category_id);
        yield put({ type: GET_SINGLE_CATEGORY, category });
    } catch (error) {
        console.log(error);
    }
}

function* getCategoriesInDepartment(action) {
    try {
        const categories = yield call(categorySerice.getCategoryInDepartment, action.department_id);
        yield put({ type: GET_CATEGORIES_IN_DEPARTMENT, categories });
    } catch (error) {
        console.log(error);
    }
}

function* getCategoriesInProduct(action) {
    try {
        const categories = yield call(categorySerice.getCategoryInProduct, action.product_id);
        yield put({ type: GET_CATEGORIES_IN_PRODUCT, categories });
    } catch (error) {
        console.log(error);
    }
}


export default function* cartegorySaga() {
    yield all([
        getAllCategoriesSaga(),
        getSingleCategorySaga(),
        getCategoriesInDepartment(),
        getCategoriesInProduct(),
    ]);
}
