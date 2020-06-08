import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
// import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
// import { connect } from 'react-redux';
// import { loginUser } from '../../store/actions/AuthActions';

class Login extends Component {
  state = {
    username: '',
    password: '',
    isAuthenticated: false,
    retryMessage: false,
  }
  handleLogin = async (event) => {
    event.preventDefault();
    const bodyData = {
      'username': this.state.username,
      'password': this.state.password,
    }
    await Axios.post('https://irctc-s3rver.herokuapp.com/login', bodyData).then((res) => {
      if(res.data.code === 200) {
        this.setState({
          isAuthenticated: true,
          user: res.data.data,
        });
      }
      else {
        this.setState({
          retryMessage: true,
        })
      }
    });
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  }
  render() {
    if(this.state.isAuthenticated) {
      return(<Redirect to={{ pathName: '/', user: this.state.user, isAuthenticated: this.state.isAuthenticated }}/>);
    }
    return (
      <div id="Login">
        <Form onSubmit={this.handleLogin}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control className="col-md-3" value={this.state.username} onChange={this.handleUsernameChange} type="username" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className="col-md-3" value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" />
          </Form.Group>
          {this.state.retryMessage? 
          <p>Check ccredentials</p>:
          null
          }
          <Button className="col-md-1" variant="primary" type="submit">Submit</Button>
        </Form>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (credentials) => dispatch(loginUser(credentials)),
//   }
// }

export default Login;
