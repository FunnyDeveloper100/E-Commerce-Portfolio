import {put, takeLatest, call} from 'redux-saga/effects';
import productsService from "../../../services/productsService";
import {
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_ERROR,

    GET_PRODUCTS_IN_CATEGORY,
    GET_PRODUCTS_IN_CATEGORY_SUCCESS,
    GET_PRODUCTS_IN_CATEGORY_ERROR,

    GET_PRODUCTS_IN_DEPARTMENT,
    GET_PRODUCTS_IN_DEPARTMENT_SUCCESS,
    GET_PRODUCTS_IN_DEPARTMENT_ERROR,

    GET_PRODUCTS_SEARCH,
    GET_PRODUCTS_SEARCH_SUCCESS,
    GET_PRODUCTS_SEARCH_ERROR,
}
    from "../../actions/products";

function* getAllProductsSaga(action) {
    try {
        const {category_id, department_id, query_string} = action.payload;
        if ( category_id) {
            yield put({type: GET_PRODUCTS_IN_CATEGORY, payload: action.payload})
        } else if (department_id) {
            yield put({type: GET_PRODUCTS_IN_DEPARTMENT, payload: action.payload})
        } else if (query_string) {
            yield put({type: GET_PRODUCTS_SEARCH, payload: action.payload})
        } else {
            const data = yield call(productsService.getAllProducts, action.payload);
            yield put({
                type: GET_ALL_PRODUCTS_SUCCESS,
                payload: data
            });
        }
    } catch (error) {
        yield put({
            type: GET_ALL_PRODUCTS_ERROR, payload: error
        });
    }
}

function* getProductsInCategorySaga(action) {
    try {
        const data = yield call(productsService.getProductsInCategory, action.payload);
        yield put({
            type: GET_PRODUCTS_IN_CATEGORY_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: GET_PRODUCTS_IN_CATEGORY_ERROR, payload: error
        });
    }
}

function* getProductsInDepartmentSaga(action) {
    try {
        const data = yield call(productsService.getProductsInDepartment, action.payload);
        yield put({
            type: GET_PRODUCTS_IN_DEPARTMENT_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: GET_PRODUCTS_IN_DEPARTMENT_ERROR, payload: error
        });
    }
}

function* getProductsSearchSaga(action) {
    try {
        const data = yield call(productsService.searchProducts, action.payload);
        yield put({
            type: GET_PRODUCTS_SEARCH_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: GET_PRODUCTS_SEARCH_ERROR, payload: error
        });
    }
}

export function* getAllProductsWatcher() {
    yield takeLatest(GET_ALL_PRODUCTS, getAllProductsSaga);
}

export function* getProductsInCategory() {
    yield takeLatest(GET_PRODUCTS_IN_CATEGORY, getProductsInCategorySaga);
}

export function* getProductsInDepartment() {
    yield takeLatest(GET_PRODUCTS_IN_DEPARTMENT, getProductsInDepartmentSaga);
}

export function* getProductsSearch() {
    yield takeLatest(GET_PRODUCTS_SEARCH, getProductsSearchSaga);
}