import React, { Component } from 'react';
import Axios from 'axios';
import { Card, Accordion, Button, Form, Modal, Col } from 'react-bootstrap';

class AllTrains extends Component {
  state = {
    trains: [],
    ticketType: 'Standard',
    currentTrain: null,
    bookingMessage: '',
    showModal: false,
    newTrainName: '',
    newTrainStart: '',
    newTrainDestination: null,
    newTrainPassengerCapacity: null,
    newTrainDistance: null,
    trainAddedMessage: '',
  }
  handleShow = () => {
    this.setState({
      showModal: true,
    });
  }
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  }
  handleBookTicket = (event, train) => {
    event.preventDefault();
    const bodyData = {
      trainId: train._id,
      ticketHolderId: this.props.user._id,
      ticketType: this.state.ticketType,
    }
    Axios.post('https://irctc-s3rver.herokuapp.com/users/' + this.props.user.username + '/tickets/new-ticket', bodyData).then((res) => {
      console.log(res.data.code);
      if(res.data.code === 200) {
        this.setState({
          bookingMessage: 'Booking Successful! Your fare is: ' + res.data.data.fare,
        });      
      }
      else {
        this.setState({
          bookingMessage: 'Booking Unuccessful!'
        });      
      }
    });
  }
  handleAddTrain = (event) => {
    event.preventDefault();
    const bodyData = {
      train: {
        trainName: this.state.newTrainName,
        start: this.state.newTrainStart,
        destination: this.state.newTrainDestination,
        distance: parseInt(this.state.newTrainDistance),
        passengerCapacity: parseInt(this.state.newTrainPassengerCapacity),
      },
      userType: 'Administrator',
    }
    console.log(bodyData);
    Axios.post('https://irctc-s3rver.herokuapp.com/trains/new-train', bodyData).then((res) => {
      if(res.data.code === 200) {
        this.setState({
          trainAddedMessage: res.data.trainName + ' added to the database',
        });
      }
    })
  }
  handleTicketTypeChange = (event) => {
    this.setState({
      ticketType: event.target.value,
    });
  }
  handleChangeNewTrainName = (event) => {
    this.setState({
      newTrainName: event.target.value,
    });
  }
  handleChangeNewTrainStart = (event) => {
    this.setState({
      newTrainStart: event.target.value,
    });
  }
  handleChangeNewTrainDestination = (event) => {
    this.setState({
      newTrainDestination: event.target.value,
    });
  }
  handleChangeNewTrainDistance = (event) => {
    this.setState({
      newTrainDistance: event.target.value,
    });
  }
  handleChangeNewTrainPassengerCapacity = (event) => {
    this.setState({
      newTrainPassengerCapacity: event.target.value,
    });
  }
  componentDidMount = () => {
    Axios.get('https://irctc-s3rver.herokuapp.com/trains/all-trains').then((res) => {
      this.setState({
        trains: res.data.data,
      });
    });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.trains.map((train) => {
            return(
              <Card>
                <Card.Body>
                  <Card.Title>{train.trainName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{train.start} to {train.destination} ({train.distance} km)</Card.Subtitle>
                  <Card.Body>No of Tickets available: {train.passengerCapacity}</Card.Body>
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="text" eventKey="0">
                          Book Ticket
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Form onSubmit={(event) => this.handleBookTicket(event, train)}>
                          <Form.Group controlId="bookTicket">
                            <Form.Label>Ticket Class</Form.Label>
                            <Form.Control value={this.state.ticketType} onChange={this.handleTicketTypeChange} as="select" defaultValue="Standard">
                              <option>First Class</option>
                              <option>Second Class</option>
                              <option>Third Class</option>
                              <option>Standard</option>
                            </Form.Control>
                          </Form.Group>
                            <Button variant="primary" type="submit">
                              Book!
                            </Button>
                        </Form>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  <p>{this.state.bookingMessage}</p>
                </Card.Body>
              </Card>
          )})}
        </div>
        {this.props.user.userType === 'Administrator'?
        <div className="addTrain">
          <Button variant="primary" onClick={this.handleShow}>
            Add Train
          </Button>

          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Train</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleAddTrain}>
                <Form.Group as={Col} controlId="newTrainName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={this.state.newTrainName} onChange={this.handleChangeNewTrainName} placeholder="Train Name" />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} controlId="newTrainStart">
                    <Form.Label>Start</Form.Label>
                    <Form.Control value={this.state.newTrainStart} onChange={this.handleChangeNewTrainStart} placeholder="Start" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="newTrainDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control value={this.state.newTrainDestination} onChange={this.handleChangeNewTrainDestination} placeholder="Destination" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="newTrainDistance">
                    <Form.Label>Distance</Form.Label>
                    <Form.Control value={this.state.newTrainDistance} onChange={this.handleChangeNewTrainDistance} placeholder="Distance" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="newTrainPassengerCapacity">
                    <Form.Label>Passenger Capacity</Form.Label>
                    <Form.Control value={this.state.newTrainPassengerCapacity} onChange={this.handleChangeNewTrainPassengerCapacity} placeholder="Passenger Capacity" />
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Add Train
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {this.state.trainAddedMessage}
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>:null
        }
      </div>
    )
  }
}

export default AllTrains;
