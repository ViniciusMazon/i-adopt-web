import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

export default function MenuBar({ search }) {

  const [filterStatus, setFilterStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchName, setSearchName] = useState('');


  function changeSearchStatus() {
    if (filterStatus) {
      setFilterStatus(false);
    }

    setSearchStatus(!searchStatus)
  }

  function changeFilterStatus() {
    if (searchStatus) {
      setSearchStatus(false);
    }

    setFilterStatus(!filterStatus)
  }

  function handleSearch() {
    search(searchName);
  }

  return (
    <div className="menuBar-container">
      <div className="menuBar-content">

        <button type="button" onClick={changeFilterStatus}>
          <FontAwesomeIcon icon={faSlidersH} className="menuBar-icon" />
        </button>

        <button onClick={changeSearchStatus} className="menuBar-icon">
          <FontAwesomeIcon icon={faSearch} className="menuBar-icon" />
        </button>
      </div>

      <div className="filterAndSearch-container">

        {
          !filterStatus ? null : (<div className="filter-container">
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
          </div>)
        }

        {
          !searchStatus ? null : (
            <div className="search-container">
              <input type="text" placeholder="Name..." value={searchName} onChange={e => setSearchName(e.target.value)} />
              <button>
                <FontAwesomeIcon icon={faAngleRight} className="search-icon" onClick={handleSearch} />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
