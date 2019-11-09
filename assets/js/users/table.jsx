import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from 'react-bootstrap';

export default function UsersTable({user}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td> {`${user.isManager}`}</td>
                    </tr>                
                </tbody>
        </Table>
    )
};