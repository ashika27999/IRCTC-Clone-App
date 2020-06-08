import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    password: '',
    emailId: '',
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    userType: '',
    registered: false,
    user: null,
  }
  handleRegister = (event) => {
    event.preventDefault();
    const bodyData = {
      username: this.state.username,
      password: this.state.password,
      emailId: this.state.emailId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      age: this.state.age,
      userType: this.state.userType
    }
    Axios.post('https://irctc-s3rver.herokuapp.com/users/new-user', bodyData).then((res) => {
      if(res.data.code === 200) {
        console.log('Success');
        this.setState({
          registered: true,
          user: res.data.data,
        });
      }
    });
  }
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  }
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }
  handleChangeEmailId = (event) => {
    this.setState({
      emailId: event.target.value,
    });
  }
  handleChangeFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  }
  handleChangeLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  }
  handleChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  }
  handleChangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  }
  handleChangeUserType = (event) => {
    this.setState({
      userType: event.target.value,
    });
  }
  render() {
    if(this.state.registered) {
      return(<Redirect to={{ pathName: '/', user: this.state.user, isAuthenticated: this.state.registered }} />)
    }
    return (
      <div id="Register">
        <Form onSubmit={this.handleRegister}>
          <Form.Row>
            <Form.Group as={Col} controlId="registerUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control  value={this.state.username} onChange={this.handleChangeUsername} type="username" placeholder="Username" />
            </Form.Group>

            <Form.Group as={Col} controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control  value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="registerEmail">
              <Form.Label>Email Id</Form.Label>
              <Form.Control  value={this.state.emailId} onChange={this.handleChangeEmailId} type="email" placeholder="Email Id" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="registerFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control  value={this.state.firstName} onChange={this.handleChangeFirstName} type="name" placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="registerLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control  value={this.state.lastName} onChange={this.handleChangeLastName} type="name" placeholder="Last Name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="registerAge">
              <Form.Label>Age</Form.Label>
              <Form.Control  value={this.state.age} onChange={this.handleChangeAge}/>
            </Form.Group>

            <Form.Group as={Col} controlId="registerGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control  value={this.state.gender} onChange={this.handleChangeGender}as="select" defaultValue="Male">
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="registerUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control  value={this.state.userType} onChange={this.handleChangeUserType}as="select" defaultValue="Standard">
                <option>Standard</option>
                <option>Administrator</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Register;
