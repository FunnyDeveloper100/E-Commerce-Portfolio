import * as Actions from '../../actions';

const initialState = {
    token: null,
    customer: null,
};

const auth = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REGISTER_CUSTOMER_SUCCESS:
        {
            return {
                token: action.response.accessToken,
                customer: action.response.customer,
                isSuccess: true,
            };
        }
        case Actions.REGISTER_CUSTOMER_ERROR:
        {
            return { 
                ...state, 
                isSuccess: false,
                error: action.error.data.error.message
            };
        }
        default:
        {
            return state;
        }
    }
};

export default auth;
