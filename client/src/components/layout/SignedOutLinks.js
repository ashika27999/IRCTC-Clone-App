import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class SignedOutLinks extends Component {
  render() {
    return (
      <div id="SignedOutLinks">
        <Nav.Link href='/login'>Log In</Nav.Link>
      </div>
    )
  }
}

export default SignedOutLinks;
