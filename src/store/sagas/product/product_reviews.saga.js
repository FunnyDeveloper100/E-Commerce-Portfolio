import {put, takeLatest, call} from 'redux-saga/effects';
import productsService from "../../../services/productsService";
import {
    GET_PRODUCT_REVIEWS,
    GET_PRODUCT_REVIEWS_SUCCESS,
    GET_PRODUCT_REVIEWS_ERROR
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


export function* getProductReviewsWatcher() {
    yield takeLatest(GET_PRODUCT_REVIEWS, productReviewsSaga);
}