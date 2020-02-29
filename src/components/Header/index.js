import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faStickyNote, faUserAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <div className="header-container">

      <img src={logo} alt="" />

      <div className="header-options">
        <Link to="/pets">
          <FontAwesomeIcon icon={faDog} className="header-icon" />
          <p>Pets</p>
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faStickyNote} className="header-icon" />
          <p>Applications</p>
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faUserAlt} className="header-icon" />
          <p>Account</p>
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faSignInAlt} className="header-icon" />
          <p>Log out</p>
        </Link>
      </div>
    </div>
  );
}
