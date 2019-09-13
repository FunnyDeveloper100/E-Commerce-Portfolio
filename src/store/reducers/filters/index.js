import * as filtersActions from '../../actions/filters';

const initialState = {
    filters: null,
    department_id: null,
    category_id: null,
    page: 1,
    offset: 0,
    limit: 9,
    description_length: 120,
    query_string: null,
};

const filters = function (state = initialState, action) {
    switch (action.type) {
        case filtersActions.UPDATE_FILTER:
            {
                return {
                    ...state,
                    ...action.payload,
                };
            }
        default:
            return state;
    }
}

export default filters;
