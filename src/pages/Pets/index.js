import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import NavBar from '../../components/NavBar';
import './styles.css';
import MenuBar from '../../components/MenuBar';
import CardCreatePet from '../../components/CardCreatePet';
import CardPet from '../../components/CardPet';


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
    <div className="pets-container">
      <NavBar />
      <MenuBar search={search} filter={filter} closeFilterAndSearch={closeFilterAndSearch} />
      <div className="pets-cards">
        {
          searchAndFilter.length === 0 ? <CardCreatePet /> : null
        }
        {
          searchAndFilter.length > 0 ? (
            searchAndFilter.map(pet => (
              <CardPet key={pet.id} data={pet} />
            ))) : (
              pets.map(pet => (
                <CardPet key={pet.id} data={pet} />
              ))
            )
        }
      </div>
    </div>
  );
}
