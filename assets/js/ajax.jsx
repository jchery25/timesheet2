import store from './store';

export function post(path, body){
    let state = store.getState();
    let token = "";

    if(state.session){
        token = state.session.token
    }

    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = "";

    if(state.session){
        token = state.session.token
    }

    return fetch('/ajax' + path, {
      method: 'get',
      credentials: 'same-origin',
      headers: new Headers({
        'x-csrf-token': window.csrf_token,
        'content-type': "application/json; charset=UTF-8",
        'accept': 'application/json',
        'x-auth': token || "",
      }),
    }).then((resp) => resp.json());
  }

export function list_users(){
    get('/users')
    .then((resp) => {
        console.log("list_users", resp.data);
        store.dispatch({
            type: 'SHOW_USERS',
            data: resp.data
        });
    });
}

export function list_jobs(){
    get('/jobs')
    .then((resp) => {
        store.dispatch({
            type: 'SHOW_JOBS',
            data: resp.data
        });
    });
}

export function list_timesheets(){
    get('/tasks')
    .then((resp) => {
        store.dispatch({
            type: 'SHOW_TIMESHEETS',
            data: resp.data
        });
    });
}

export function get_timesheet(id){
    get('/tasks/'+id)
    .then((resp) => {
      store.dispatch({
        type: 'ADD_TIMESHEETS',
        data: [resp.data],
      });
    });
}

export function submit_timesheet(form){
    let state = store.getState();
    let data = state.forms.new_timesheet;
    
    post('/tasks', {
        task: {
            user_id: data.user_id,
            job_code: data.job_code,
            number_of_hours: data.number_of_hours,
            note: data.note
        }
    }).then((resp) => {
            if(resp.data){
                store.dispatch({
                    type: 'ADD_TIMESHEET',
                    data: [resp.data],
                })
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'CHANGE_TIMESHEET',
                    data: {errors: JSON.stringify(resp.errors)}
                });
            }
        });
}

export function submit_login(form){
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            if(resp.token){
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
    });
}

