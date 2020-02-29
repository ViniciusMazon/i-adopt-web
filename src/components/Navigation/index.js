import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import './styles.css';


export default function Navigation({ linkPath }) {

  return (
    <div className="navigation-container">
      <Link to={`${linkPath}`}>
        <FontAwesomeIcon icon={faArrowLeft} className="tab-icon" />
      </Link>
    </div>
  );
}
