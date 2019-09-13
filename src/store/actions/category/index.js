export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';

export const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY';
export const GET_SINGLE_CATEGORY_SUCCESS = 'GET_SINGLE_CATEGORY_SUCCESS';

export const GET_CATEGORIES_IN_PRODUCT = 'GET_CATEGORIES_IN_PRODUCT';
export const GET_CATEGORIES_IN_PRODUCT_SUCCESS = 'GET_CATEGORIES_IN_PRODUCT_SUCCESS';

export const GET_CATEGORIES_IN_DEPARTMENT = 'GET_CATEGORIES_IN_DEPARTMENT';
export const GET_CATEGORIES_IN_DEPARTMENT_SUCCESS = 'GET_CATEGORIES_IN_DEPARTMENT_SUCCESS';

export const getAllCategories = () => ({
    type: GET_ALL_CATEGORIES,
});

export const getSingleCategory = category_id => ({
    type: GET_SINGLE_CATEGORY,
    payload: category_id
});

export const getCategoriesInProduct = product_id => ({
    type: GET_CATEGORIES_IN_PRODUCT,
    payload: product_id
});

export const getCategoriesInDepartment = department_id => ({
    type: GET_CATEGORIES_IN_DEPARTMENT,
    payload: department_id
})