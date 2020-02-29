import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

export default function Filter() {
  return (
    <div className="filter-container">
      <select id="select-specie">
        <option value="" selected>Specie</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      <select id="select-gender">
        <option value="" selected>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select id="select-size">
        <option value="" selected>Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="big">Big</option>
      </select>

      <button>
        <FontAwesomeIcon icon={faAngleRight} className="filter-icon" />
      </button>
    </div>
  );
}


