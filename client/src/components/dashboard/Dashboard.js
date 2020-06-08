import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AllTrains from './AllTrains';
import MyJourneys from './MyJourneys';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    if(!this.props.location.isAuthenticated && !this.props.location.user) {
      return(<Redirect to='/login' />);
    }
    return (
      <div id="Dashboard">
        <Tabs className="justify-content-center" defaultActiveKey="allTrains" id="dashboard-tabs">
          <Tab eventKey="allTrains" title="All Trains">
            <AllTrains user={this.props.location.user}/>
          </Tab>
          <Tab eventKey="myJourneys" title="My Journeys">
            <MyJourneys user={this.props.location.user}/>
          </Tab>
        </Tabs>     
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//     isAuthenticated: state.auth.isAuthenticated,
//     loginError: state.auth.loginError
//   }
// }

export default Dashboard;
