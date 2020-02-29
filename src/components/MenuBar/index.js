import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import Filter from '../Filter';
import Search from '../Search';

export default function MenuBar() {

  const [filterStatus, setFilterStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);


  function handleSearch() {
    if (filterStatus) {
      setFilterStatus(false);
    }

    setSearchStatus(!searchStatus)
  }

  function handleFilter() {
    if (searchStatus) {
      setSearchStatus(false);
    }

    setFilterStatus(!filterStatus)
  }

  return (
    <div className="menuBar-container">
      <div className="menuBar-content">


        <button type="button" onClick={handleFilter}>
          <FontAwesomeIcon icon={faSlidersH} className="menuBar-icon" />
        </button>

        <button onClick={handleSearch} className="menuBar-icon">
          <FontAwesomeIcon icon={faSearch} className="menuBar-icon" />
        </button>
      </div>
      <div className="filterAndSearch-container">
        {
          filterStatus ? <Filter /> : null
        }
        {
          searchStatus ? <Search /> : null
        }

      </div>
    </div>
  );
}
