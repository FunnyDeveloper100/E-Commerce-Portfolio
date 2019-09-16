import * as Actions from '../../actions/customers';

const initialState = {
    token: null,
    customer: null,
    isAuthenticated: false,
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
            localStorage.removeItem('token');
            return {
                isAuthenticated: false,
                customer: null,
                isSuccess: false,
            }
        }
        case Actions.UPDATE_CUSTOMER_PROFILE_SUCCESS:
            {
                return {
                    ...state,
                    customer: action.customer,
                }
            }
        default:
        {
            return state;
        }
    }
};

export default auth;
