import * as departmentsActions from '../../actions/departments';

const initialState = {
    departments: []
};

const departments = function (state = initialState, action) {
    switch (action.type) {
        case departmentsActions.GET_ALL_DEPARTMENTS_SUCCESS:
            {
                return {
                    ...state,
                    departments: action.departments
                };
            }
        case departmentsActions.GET_DEPARTMENT_SUCCESS:
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
