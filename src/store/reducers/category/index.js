import * as categoryActions from '../../actions/category';

const initialState = {
    categories: []
};

const category = function (state = initialState, action) {
    switch (action.type) {
        case categoryActions.GET_ALL_CATEGORIES:
            {
                return {
                    ...state,
                    categories: action.categories
                };
            }
        case categoryActions.GET_SINGLE_CATEGORY:
            {
                return {
                    ...state,
                    category: action.category
                }
            }
        case categoryActions.GET_CATEGORIES_IN_DEPARTMENT:
            {
                return {
                    ...state,
                    categories_in_department: action.categories
                }
            }
        case categoryActions.GET_CATEGORIES_IN_PRODUCT:
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
