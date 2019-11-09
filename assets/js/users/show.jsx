import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_users } from '../ajax';
import UsersTable from './table'

let ShowUsers = connect(({users}) => ({users}))(({users}) => {
    console.log(users)
    if(users.size == 0){
        list_users();
    }

    let usertable = _.map([...users], ([_, user]) => {
        return <UsersTable key={user.id} user={user} />
    })

    return(
        <div>
            <h1>Users</h1>
                {usertable}
        </div>
    )
});

export default ShowUsers;