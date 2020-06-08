import React, { Component } from 'react';
import Axios from 'axios';
import { Card } from 'react-bootstrap';

class MyJourneys extends Component {
  state = {
    tickets: [],
    trains: [],
  }
  componentDidMount = async () => {
    var ticketIds;
    var tickets = [];
    var trains = [];
    await Axios.get('https://irctc-s3rver.herokuapp.com/users/' + this.props.user.username).then((res) => {
      ticketIds = res.data.data.allTickets;
    });
    for (var i = 0; i < ticketIds.length; i++) {
      await Axios.get('https://irctc-s3rver.herokuapp.com/users/athithya12/tickets/' + ticketIds[i]).then((res) => {
        tickets.push(res.data.data);
      });
    }
    for (i = 0; i < tickets.length; i++) {
      await Axios.get('https://irctc-s3rver.herokuapp.com/trains/' + tickets[i].trainId).then((res) => {
        trains.push(res.data.data);
      });
    }
    this.setState({
      tickets: tickets,
      trains: trains,
    }); 
  }
  render() {
    return (
      <div id="MyJourneys">
        {Array(this.state.tickets.length).fill().map((_, i) => {
          return(
            <Card>
              <Card.Body>
                <Card.Title>{this.state.trains[i].trainName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.trains[i].start} to {this.state.trains[i].destination}</Card.Subtitle>
                <Card.Text>
                  <strong>Fare: </strong>{this.state.tickets[i].fare}<br/>
                  <strong>Class: </strong>{this.state.tickets[i].ticketType}<br/>
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default MyJourneys;
