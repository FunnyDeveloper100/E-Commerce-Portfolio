export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY';
export const GET_CATEGORIES_IN_PRODUCT = 'GET_CATEGORIES_IN_PRODUCT';
export const GET_CATEGORIES_IN_DEPARTMENT = 'GET_CATEGORIES_IN_DEPARTMENT';


export const getAllCategories = () => ({
    type: GET_ALL_CATEGORIES,
});

export const getSingleCategory = category_id => ({
    type: GET_SINGLE_CATEGORY,
    category_id: category_id
});

export const getCategoriesInProduct = product_id => ({
    type: GET_CATEGORIES_IN_PRODUCT,
    product_id: product_id
});

export const getCategoriesInDepartment = department_id => ({
    type: GET_CATEGORIES_IN_DEPARTMENT,
    department_id: department_id
})