import { SET_EMPLOYEES } from '../actions/employees';

const initialState = [];

export default function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMPLOYEES:
            return action.payload;
        default:
            return state;
    }
}