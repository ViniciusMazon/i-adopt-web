import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import Filter from '../Filter';

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
          filterStatus ? <Filter /> : null
        }

        {
          !searchStatus ? null : (
            <div className="search-container">
              <input type="text" placeholder="Name..." value={searchName} onChange={e => setSearchName(e.target.value)} />
              <button>
                <FontAwesomeIcon icon={faAngleRight} className="search-icon" onClick={handleSearch}/>
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
