import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from 'react-bootstrap';

export default function JobsTable({job}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Job Name</th>
                <th>Jobe Code</th>
                <th>Budget</th>
                <th>Description</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{job.name}</td>
                    <td>{job.job_code}</td>
                    <td> {job.budget}</td>
                    <td> {job.desc}</td>
                    </tr>                
                </tbody>
        </Table>
    )
};