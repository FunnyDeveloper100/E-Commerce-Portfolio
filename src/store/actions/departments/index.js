export const GET_ALL_DEPARTMENTS = 'GET_ALL_DEPARTMENTS';
export const GET_ALL_DEPARTMENTS_SUCCESS = 'GET_ALL_DEPARTMENTS_SUCCESS';
export const GET_DEPARTMENT = 'GET_DEPARTMENT';
export const GET_DEPARTMENT_SUCCESS = 'GET_DEPARTMENT_SUCCESS';


export const getAllDepartments = () => ({
    type: GET_ALL_DEPARTMENTS,
});

export const getDepartment = department_id => ({
    type: GET_DEPARTMENT,
    department_id: department_id
});