export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_ALL_PRODUCTS_ERROR = 'GET_ALL_PRODUCTS_ERROR';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';

export const GET_PRODUCTS_IN_CATEGORY = 'GET_PRODUCTS_IN_CATEGORY';
export const GET_PRODUCTS_IN_CATEGORY_SUCCESS = 'GET_PRODUCTS_IN_CATEGORY_SUCCESS';
export const GET_PRODUCTS_IN_CATEGORY_ERROR = 'GET_PRODUCTS_IN_CATEGORY_ERROR';

export const GET_PRODUCTS_IN_DEPARTMENT = 'GET_PRODUCTS_IN_DEPARTMENT';
export const GET_PRODUCTS_IN_DEPARTMENT_SUCCESS = 'GET_PRODUCTS_IN_DEPARTMENT_SUCCESS';
export const GET_PRODUCTS_IN_DEPARTMENT_ERROR = 'GET_PRODUCTS_IN_DEPARTMENT_ERROR';

export const GET_PRODUCTS_SEARCH = 'GET_PRODUCTS_SEARCH';
export const GET_PRODUCTS_SEARCH_SUCCESS = 'GET_PRODUCTS_SEARCH_SUCCESS';
export const GET_PRODUCTS_SEARCH_ERROR = 'GET_PRODUCTS_SEARCH_ERROR';

export const getAllProducts = (data) => ({
    type: GET_ALL_PRODUCTS,
    payload: data
});

export const getProductsInCategory = (data) => ({
    type: GET_PRODUCTS_IN_CATEGORY,
    payload: data
})

export const getProductsInDepartment = (data) => ({
    type: GET_PRODUCTS_IN_DEPARTMENT,
    payload: data
})

export const getProductsSearch = (data) => ({
    type: GET_PRODUCTS_SEARCH,
    payload: data
})