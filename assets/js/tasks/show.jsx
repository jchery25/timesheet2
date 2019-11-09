import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_timesheets } from '../ajax';
import TimesheetTable from './table';


let TimesheetShow = connect(({timesheet}) => ({timesheet}))(({timesheet}) => {
    if(timesheet.size == 0){
        list_timesheets();
    }
    
    let timesheettable = _.map([...timesheet], ([_, timesheet]) => {
        return <TimesheetTable key={timesheet.id} timesheet={timesheet} />
    })

    return(
        <div>
            <h1>Show Timesheet</h1>
            {timesheettable}
        </div>
    )
});

export default TimesheetShow;