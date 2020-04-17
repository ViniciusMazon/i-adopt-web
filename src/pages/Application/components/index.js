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

export default function SearchAndFilter({ searchFunction, filterFunction }) {

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState("'accept','new','adopted','rejected','canceled'");

  function handlerSearch() {
    searchFunction(searchText);
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
        <Text className="text" type="text" placeholder="Type to search" value={searchText} onChange={e => setSearchText(e.target.value)} />
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
