import * as categoryActions from '../../actions/category';

const initialState = {
    categories: []
};

const category = function (state = initialState, action) {
    switch (action.type) {
        case categoryActions.GET_ALL_CATEGORIES_SUCCESS:
            {
                return {
                    ...state,
                    categories: action.categories
                };
            }
        case categoryActions.GET_SINGLE_CATEGORY_SUCCESS:
            {
                return {
                    ...state,
                    category: action.category
                }
            }
        case categoryActions.GET_CATEGORIES_IN_DEPARTMENT_SUCCESS:
            {
                return {
                    ...state,
                    categories_in_department: action.categories
                }
            }
        case categoryActions.GET_CATEGORIES_IN_PRODUCT_SUCCESS:
            {
                return {
                    ...state,
                    categories_in_product: action.categories
                }
            }
        default:
            return state;
    }
}

export default category;
