import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div id="NavBar">
        <Navbar bg='light'>
        <Link to='/'><Navbar.Brand>IRCTC Clone</Navbar.Brand></Link>
          <Nav className="ml-auto">
            <Nav.Link href='/login'>Log In</Nav.Link>
            <Nav.Link href='/login'>Log out</Nav.Link>
            <Nav.Link href='/register'>Register</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavBar;
