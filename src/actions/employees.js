export const SET_EMPLOYEES = 'SET_EMPLOYEES';

export const fetchEmployees = () => async (dispatch) => {
    const res = await fetch('/api/employees');
    const data = await res.json();
    dispatch({ type: SET_EMPLOYEES, payload: data });
};

export const addEmployee = (employee) => async (dispatch) => {
    const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    if (res.ok) dispatch(fetchEmployees());
};

export const updateEmployee = (id, updatedEmployee) => async (dispatch) => {
    const res = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee)
    });
    if (res.ok) dispatch(fetchEmployees());
};

export const deleteEmployee = (id) => async (dispatch) => {
    const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    });
    if (res.ok) dispatch(fetchEmployees());
};