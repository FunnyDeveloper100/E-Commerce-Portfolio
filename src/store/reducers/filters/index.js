import * as filtersActions from '../../actions/filters';

const initialState = {
    items: []
};

const filters = function (state = initialState, action) {
    switch (action.type) {
        case filtersActions.UPDATE_FILTER:
            {
                return {
                    ...state,
                    items: action.payload
                };
            }
        default:
            return state;
    }
}

export default filters;
