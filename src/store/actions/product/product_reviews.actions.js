export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS';
export const GET_PRODUCT_REVIEWS_ERROR = 'GET_PRODUCT_REVIEWS_ERROR';
export const GET_PRODUCT_REVIEWS_SUCCESS = 'GET_PRODUCT_REVIEWS_SUCCESS';

export const CREATE_PRODUCT_REVIEW = 'CREATE_PRODUCT_REVIEW';
export const CREATE_PRODUCT_REVIEW_ERROR = 'CREATE_PRODUCT_REVIEW_ERROR';
export const CREATE_PRODUCT_REVIEW_SUCCESS = 'CREATE_PRODUCT_REVIEW_SUCCESS';

export const getProductReviews = (data) => ({
    type: GET_PRODUCT_REVIEWS,
    payload: data
});

export const createProductReviews = (data) => ({
    type: CREATE_PRODUCT_REVIEW,
    payload: data
});