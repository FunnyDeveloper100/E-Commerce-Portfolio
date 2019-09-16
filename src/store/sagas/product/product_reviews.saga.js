import {put, takeLatest, call} from 'redux-saga/effects';
import productsService from "../../../services/productsService";
import {
    GET_PRODUCT_REVIEWS,
    GET_PRODUCT_REVIEWS_SUCCESS,
    GET_PRODUCT_REVIEWS_ERROR,

    CREATE_PRODUCT_REVIEW,
    CREATE_PRODUCT_REVIEW_SUCCESS,
    CREATE_PRODUCT_REVIEW_ERROR,
}
    from "../../actions/product";

function* productReviewsSaga(action) {
    try {
        let response = yield call(productsService.getProductReviews, action.payload);
        
        response.rating = 0;
        const reviews = response;
        const cnt = reviews.length;
        if (cnt > 0) {
            const rating = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
            response.rating = rating
        }

        yield put({
            type: GET_PRODUCT_REVIEWS_SUCCESS,
            payload: response
        });

    } catch (error) {
        yield put({
            type: GET_PRODUCT_REVIEWS_ERROR, payload: error
        });
    }
}

function* createProductReviewsSaga(action) {
    try {
        yield call(productsService.createProductReview, action.payload);
        yield put({type: GET_PRODUCT_REVIEWS, payload: action.payload});
    } catch (error) {
        yield put({type: CREATE_PRODUCT_REVIEW_ERROR, error: error});
    }
}
export function* getProductReviewsWatcher() {
    yield takeLatest(GET_PRODUCT_REVIEWS, productReviewsSaga);
}

export function* createProductReviewsWatcher() {
    yield takeLatest(CREATE_PRODUCT_REVIEW, createProductReviewsSaga);
}