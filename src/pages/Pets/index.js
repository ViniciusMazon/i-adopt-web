import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import {
  Container,
  Table,
  TableHeaderColumn,
  TableHeaderRow,
  TableColum,
  TableRow,
  TableRowButton,
  Avatar
} from './styles';

import imageTemp from '../../assets/temp-avatar-dog.jpg';

import NavBar from '../../components/NavBar';
import MenuBar from '../../components/MenuBar';



export default function Pets() {

  const [pets, setPets] = useState([]);
  const [searchAndFilter, setSearchAndFilter] = useState([]);

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  useEffect(() => {
    async function initPetPage() {
      const [, token] = token_bearer.split(' ');
      var decoded = jwt.decode(token, { complete: true });
      const response = await axios.get(`http://localhost:4000/pets?organization=${decoded.payload.org_id}`, {
        headers: { Authorization: token_bearer }
      });
      setPets(response.data);
    }

    initPetPage();
  }, []);

  function search(searchName) {
    if (searchName) {
      const searchResult = pets.filter(pet => pet.name.toLowerCase() === searchName.toLowerCase());
      if (searchResult.length >= 1) {
        setSearchAndFilter(searchResult);
      }
    } else {
      setSearchAndFilter([])
    }
  }

  function filter(filters) {
    setSearchAndFilter([]);
    var result = [];

    if (filters.specie) {
      result.length !== 0 ? result = result.filter(pet => pet.specie === filters.specie) : result = pets.filter(pet => pet.specie === filters.specie);
    }

    if (filters.gender) {
      result.length !== 0 ? result = result.filter(pet => pet.gender === filters.gender) : result = pets.filter(pet => pet.gender === filters.gender);
    }

    if (filters.size) {
      result.length !== 0 ? result = result.filter(pet => pet.size === filters.size) : result = pets.filter(pet => pet.size === filters.size);
    }

    setSearchAndFilter(result);
  }

  function closeFilterAndSearch() {
    setSearchAndFilter([]);
  }

  return (
    <Container>
      <NavBar />
      <MenuBar search={search} filter={filter} closeFilterAndSearch={closeFilterAndSearch} />
      <Link to='/pets/new' style={{color: '#F67280'}}>Create new</Link>
      <Table>
        <TableHeaderColumn>
          <TableHeaderRow width={'8%'}>ID</TableHeaderRow>
          <TableHeaderRow width={'20%'}>Pet</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Specie</TableHeaderRow>
          <TableHeaderRow width={'15%'}>Gender</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Size</TableHeaderRow>
          <TableHeaderRow width={'12%'}>Price</TableHeaderRow>
          <TableHeaderRow width={'13%'}>Date</TableHeaderRow>
          <TableHeaderRow width={'16%'}>Action</TableHeaderRow>
        </TableHeaderColumn>
        {
          pets.map(pet => (
            <TableColum>
              <TableRow width={'8%'}>{pet.id}</TableRow>
              <TableRow width={'20%'}>
                <Avatar src={imageTemp} />
                {pet.name}
              </TableRow>
              <TableRow width={'8%'}>{pet.specie}</TableRow>
              <TableRow width={'15%'}>{pet.gender}</TableRow>
              <TableRow width={'8%'}>{pet.size}</TableRow>
              <TableRow width={'12%'}>{pet.price}</TableRow>
              <TableRow width={'13%'}>{pet.creation_date.split('T')[0]}</TableRow >
              <TableRowButton width={'6%'}>
                <Link to={`/pets/edit/${pet.id}`}>
                  Edit <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
                </Link>
              </TableRowButton>
              <TableRowButton width={'10%'}>
                <Link to={`/pets/application/${pet.id}`}>
                  Application <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
                </Link>
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
    </Container>
  );
}
