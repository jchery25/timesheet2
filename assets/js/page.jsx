import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { Redirect } from 'react-router';

import Timesheet from './tasks/new';
import TimesheetShow from './tasks/show';

import ShowUsers from './users/show';
import ShowJobs from './jobs/show';
import Login from './login';

import store from './store';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  )
    ReactDOM.render(tree, root);
  }

  function Page(props) {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Col md="8">
            <Nav>
              <Nav.Item>
                <NavLink to="/" exact activeClassName="active" className="nav-link">
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/users" exact activeClassName="active" className="nav-link">
                  Users
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/jobs" exact activeClassName="active" className="nav-link">
                  Jobs
                </NavLink>
              </Nav.Item>
              <SubmitTimesheet />
            </Nav>
          </Col>
          <Col md="4">
            <Session />
          </Col>
        </Navbar>
  
        <Switch>
          <Route exact path="/">
            <h1>Welcome to ACME Engineering</h1>
          </Route>
  
          <Route exact path="/users">
            <ShowUsers />
          </Route>

          <Route exact path="/jobs">
            <ShowJobs />
          </Route>

          <Route exact path="/tasks/new">
            <Timesheet />
          </Route>

          <Route exact path="/tasks/show">
            <TimesheetShow />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }

  let SubmitTimesheet = connect(({session}) => ({session}))(({session, dispatch}) => {
    if (session) {
      return (
            <Nav.Item>
              <NavLink to="/tasks/new" exact activeClassName="active" className="nav-link">
                Submit Timesheet
              </NavLink>
              <NavLink to="/tasks/show" exact activeClassName="active" className="nav-link">
                Show Timesheet
              </NavLink>
            </Nav.Item>
      );
    } else {
      return <Redirect to="/" />;
    }
  })

  let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
    function logout(ev) {
      ev.preventDefault();
      localStorage.removeItem('session');
      dispatch({
        type: 'LOG_OUT',
      });
    }
  
    if (session) {
      return (
        <Nav>
          <Nav.Item>
            <p className="text-light py-2">User: {session.user_name}</p>
          </Nav.Item>
          <Nav.Item>
            <a className="nav-link" href="#" onClick={logout}>Logout</a>
          </Nav.Item>
        </Nav>
      );
    }
    else {
      return (
        <Nav>
          <Nav.Item>
            <NavLink to="/login" exact activeClassName="active" className="nav-link">
              Login
            </NavLink>
          </Nav.Item>
        </Nav>
      );
    }
  });
