import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import {
  Container,
  Box,
  Text,
  Select,
  Button
} from './styles';

export default function SearchAndFilter({ searchFunction, resetSearch, filterFunction }) {

  const [searchById, setSearchById] = useState(0);
  const [searchByName, setSearchByName] = useState('');
  const [filterStatus, setFilterStatus] = useState("'accept','new','adopted','rejected','canceled'");

  async function setSearchValue(value) {

    const convertedValue = parseInt(value);

    if (isNaN(convertedValue)) {
      setSearchByName(value);
      setSearchById(0);
    } else if (Number.isInteger(convertedValue)) {
      setSearchById(convertedValue);
      setSearchByName('');
    }
  }

  function handlerSearch() {
    if (searchById === 0 && searchByName === '') {
      resetSearch();
    } else {
      searchFunction(searchById, searchByName);
    }
    console.log('searching or reset search!');
  }

  function handleFilter() {
    const filters = {
      status: filterStatus,
    }

    filterFunction(filters);
  }

  return (
    <Container>

      <Box>
        <Text className="text" type="text" placeholder="Search by name or id" onChange={e => setSearchValue(e.target.value)} />
        <Button className="button" onClick={handlerSearch}>
          <a href="#">
            <FontAwesomeIcon icon={faSearch} className="menuBar-icon" color={"#F67280"} />
          </a>
        </Button>
      </Box>

      <Box>
        <Select className="text" onChange={e => setFilterStatus(e.target.value)}>
          <option value="'accept','new','adopted','rejected','canceled'" selected>Status</option>
          <option value="'accept'">Accept</option>
          <option value="'new'">New</option>
          <option value="'adopted'">Adopted</option>
          <option value="'rejected'">Rejected</option>
          <option value="'canceled'">Canceled</option>
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
