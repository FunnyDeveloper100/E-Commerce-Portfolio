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
                customer: action.customer,
                isAuthenticated: action.customer ? true : false,
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
        case Actions.LOGIN_CUSTOMER_SUCCESS:
        {
            return {
                customer: action.customer,
                isAuthenticated: action.customer ? true : false,
                isSuccess: true,
            };
        }
        case Actions.LOGIN_CUSTOMER_ERROR:
        {
            return { 
                ...state, 
                isSuccess: false,
                error: action.error.data.error.message
            };
        }
        case Actions.LOGOUT_CUSTOMER:
        {
            return {
                customer: null,
                isSuccess: false,
            }
        }
        default:
        {
            return state;
        }
    }
};

export default auth;
