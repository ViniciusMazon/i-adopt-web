import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter, faSearch, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

export default function MenuBar({ search, filter, closeFilterAndSearch }) {

  const [filterStatus, setFilterStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filterSpecie, setFilterSpecie] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterSize, setFilterSize] = useState('');


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

  function handleCloseSearch() {
    setSearchName('');
    setSearchStatus(false);
    closeFilterAndSearch();
  }

  function handleFilter() {
    const filters = {
      specie: filterSpecie,
      gender: filterGender,
      size: filterSize
    }
    filter(filters);
  }

  function handleCloseFilter() {
    setFilterSpecie('');
    setFilterGender('');
    setFilterSize('');
    setFilterStatus(false);
    closeFilterAndSearch();
  }

  return (
    <div className="menuBar-container">
      <div className="menuBar-content">

        <button type="button" onClick={changeFilterStatus}>
          <FontAwesomeIcon icon={faFilter} className="menuBar-icon" />
        </button>

        <button onClick={changeSearchStatus} className="menuBar-icon">
          <FontAwesomeIcon icon={faSearch} className="menuBar-icon" />
        </button>
      </div>

      <div className="filterAndSearch-container">

        {
          !filterStatus ? null : (<div className="filter-container">
            <button id="close-button" onClick={handleCloseFilter}>
              <FontAwesomeIcon icon={faTimes} className="filter-icon" />
            </button>

            <select onChange={e => setFilterSpecie(e.target.value)}>
              <option value="" selected>Specie</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <select onChange={e => setFilterGender(e.target.value)}>
              <option value="" selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select id="select-size" onChange={e => setFilterSize(e.target.value)}>
              <option value="" selected>Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="big">Big</option>
            </select>

            <button onClick={handleFilter}>
              <FontAwesomeIcon icon={faAngleRight} className="filter-icon" />
            </button>
          </div>)
        }

        {
          !searchStatus ? null : (
            <div className="search-container">
              <button id="close-button" onClick={handleCloseSearch}>
                <FontAwesomeIcon icon={faTimes} className="filter-icon" />
              </button>
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
