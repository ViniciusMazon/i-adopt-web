import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';
import avatarTemp from '../../assets/dog-example.jpg';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import MenuBar from '../../components/MenuBar';
import CardCreatePet from '../../components/CardCreatePet';
import CardPet from '../../components/CardPet';


export default function Pets() {

  const [pets, setPets] = useState([]);
  const [searchAndFilter, setSearchAndFilter] = useState([]);

  useEffect(() => {
    async function initPetPage() {
      const user = JSON.parse(sessionStorage.getItem('IAdopt_user'));
      const response = await axios.get(`http://localhost:4000/pets?organization=${user.organization}`);
      setPets(response.data);
    }

    initPetPage();
  }, []);

  function search(searchName) {
    if (searchName) {
      const searchResult = pets.filter(pet => pet.name === searchName);
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
      <Header />
      <Navigation linkPath={'/home'} />
      <MenuBar search={search} filter={filter} closeFilterAndSearch={closeFilterAndSearch} />
      <div className="pets-cards">

        {
          searchAndFilter.length === 0 ? <CardCreatePet /> : null
        }

        {
          searchAndFilter.length > 0 ? (
            searchAndFilter.map(pet => (
              <CardPet key={pet.id} data={pet} avatarTemp={avatarTemp} />
            ))) : (
              pets.map(pet => (
                <CardPet key={pet.id} data={pet} avatarTemp={avatarTemp} />
              ))
            )
        }
      </div>
    </div>
  );
}
