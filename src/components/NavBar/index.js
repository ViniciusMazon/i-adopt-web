import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDog, faStickyNote, faCog, faKey, faUserAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import logo from '../../assets/logo.png';

export default function NavBar() {
  return (
    <Navbar expand="lg" fixed="top" className="navBar-container">
      <Navbar.Brand href="/home">
        <img src={logo} alt="logo" id="navBar-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="ml-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/pets">Pets</Nav.Link>
          <Nav.Link href="/home">Applications</Nav.Link>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
            <NavDropdown.Item href="/account/password">Change password</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Log out</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/home">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
