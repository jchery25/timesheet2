import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

function new_timesheet(st0 = { user_id: null, job_code: "", number_of_hours: 0, note: "", errors: null }, action) {
    let session0 = localStorage.getItem('session');
    if (session0) {
        session0 = JSON.parse(session0);
        st0 = Object.assign({}, st0, { user_id: session0.user_id });
    }
    switch (action.type) {
        case 'CHANGE_TIMESHEET':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function login(st0 = { email: "", password: "", errors: null }, action) {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}


function forms(st0, action) {
    let reducer = combineReducers({
        new_timesheet,
        login,
    });
    return reducer(st0, action);
}

function users(st0 = new Map(), action) {
    switch (action.type) {
        case 'SHOW_USERS':
            let st1 = new Map(st0);
            for (let user of action.data) {
                st1.set(user.id, user)
            }
            return st1;
        default:
            return st0;
    }
}


function jobs(st0 = new Map(), action) {
    switch (action.type) {
        case 'SHOW_JOBS':
            let st1 = new Map(st0);
            for (let job of action.data) {
                st1.set(job.id, job)
            }
            return st1;
        default:
            return st0;
    }
}

function timesheet(st0 = new Map(), action) {
    let st1 = new Map(st0);

    switch (action.type) {
        case 'ADD_TIMESHEET':
            for (let task of action.data) {
                st1.set(task.id, task)
            }
            return st1;
        case 'SHOW_TIMESHEETS':
            for (let task of action.data) {
                st1.set(task.id, task)
            }
            return st1;
        default:
            return st0;
    }
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0)
}

function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        forms,
        users,
        jobs,
        timesheet,
        session
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;