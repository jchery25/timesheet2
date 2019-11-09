import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_timesheet, list_jobs } from '../ajax';

function state2props(state){
    return state.forms.timesheet;
}

class Timesheet extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: null
        }
    }

    redirect(path){
        this.setState({
            redirect: path,
        });
    }

    changed(data){
        this.props.dispatch({
            type:'CHANGE_TIMESHEET',
            data: data,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        let {job_code, number_of_hours, note, errors} = this.props;
        let error_msg = null;
        if(errors){
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }

          return(
              <div>
                  <h1>New Timesheet</h1>
                  {error_msg}
                  <Form.Group controlId="job_code">
                    <Form.Label>Job Code</Form.Label>
                        <Form.Control as="select" onChange={(ev) => this.changed({job_code: ev.target.value})}>
                            <option></option>
                                <JobCodeOption />
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="number_of_hours">
                        <Form.Label>Number of Hours</Form.Label>
                        <Form.Control as="select" onChange={(ev) => this.changed({number_of_hours: ev.target.value}) }>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="note">
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={(ev) => this.changed({note: ev.target.value}) }/>
                    </Form.Group>
                    <Form.Group controlId="submit">
                        <Button variant="primary" onClick={() => submit_timesheet(this)}>
                            Submit Timesheet
                        </Button>
                    </Form.Group>
              </div>
          )
        }
    }

    let JobCodeOption = connect(({jobs}) => ({jobs}))(({jobs}) => {
        if(jobs.size == 0){
            list_jobs();
        }
    
        let joboption = _.map([...jobs], ([_, job]) => {
            return <option key={job.id} value={job.job_code}>{job.name}</option>
        })  
        
        return joboption
    });

export default connect(state2props)(Timesheet);