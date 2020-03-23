import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import {
  Container,
  Box,
  Text,
  Select,
  Button
} from './styles';

export default function SearchAndFilter({ searchFunction, filterFunction }) {

  const [searchText, setSearchText] = useState('');
  const [filterSpecie, setFilterSpecie] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterSize, setFilterSize] = useState('');

  function handlerSearch() {
    searchFunction(searchText);
  }

  function handleFilter() {
    const filters = {
      specie: filterSpecie,
      gender: filterGender,
      size: filterSize
    }

    filterFunction(filters);
  }

  return (
    <Container>

      <Box>
        <Text className="text" type="text" placeholder="Type to search" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Button className="button" onClick={handlerSearch}>
          <a href="#">
            <FontAwesomeIcon icon={faSearch} className="menuBar-icon" color={"#F67280"} />
          </a>
        </Button>
      </Box>

      <Box>
        <Select className="text" onChange={e => setFilterSpecie(e.target.value)}>
          <option value="" selected>Specie</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </Select>
        <Select className="text" onChange={e => setFilterGender(e.target.value)}>
          <option value="" selected>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        <Select className="text" onChange={e => setFilterSize(e.target.value)}>
          <option value="" selected>Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="big">Big</option>
        </Select>
        <Button className="button" onClick={handleFilter}>
          <a href="#">
            <FontAwesomeIcon icon={faFilter} className="menuBar-icon" color={"#F67280"} />
          </a>
        </Button>
      </Box>
    </Container >
  );
}
