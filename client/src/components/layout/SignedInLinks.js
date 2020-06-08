import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class SignedInLinks extends Component {
  render() {
    return (
      <div id="SignedInLinks">
        <Nav.Link href='/logout'>Log out</Nav.Link>
      </div>
    )
  }
}

export default SignedInLinks;
