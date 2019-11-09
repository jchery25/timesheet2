import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_jobs } from '../ajax';
import JobsTable from './table';

let ShowJobs = connect(({jobs}) => ({jobs}))(({jobs}) => {
    if(jobs.size == 0){
        list_jobs();
    }

    let jobtable = _.map([...jobs], ([_, jobs]) => {
        return <JobsTable key={jobs.id} job={jobs} />
    })

    return(
        <div>
            <h1>Jobs</h1>
                {jobtable}
        </div>
    )
});

export default ShowJobs;