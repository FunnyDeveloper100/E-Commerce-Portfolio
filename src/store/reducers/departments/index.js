import * as departmentsActions from '../../actions/departments';

const initialState = {
    departments: []
};

const departments = function (state = initialState, action) {
    switch (action.type) {
        case departmentsActions.GET_ALL_DEPARTMENTS:
            {
                return {
                    ...state,
                    departments: action.departments
                };
            }
        case departmentsActions.GET_DEPARTMENT:
            {
                return {
                    ...state,
                    department: action.department
                }
            }
        default:
            return state;
    }
}

export default departments;
