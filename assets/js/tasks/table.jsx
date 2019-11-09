import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from 'react-bootstrap';

export default function TimesheetTable({timesheet}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Job Name</th>
                <th>Hours</th>
                <th>Note</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                    <td>{timesheet.job_code}</td>
                    <td>{timesheet.number_of_hours}</td>
                    <td>{timesheet.note}</td>
                    </tr>                
                </tbody>
        </Table>
    )
};