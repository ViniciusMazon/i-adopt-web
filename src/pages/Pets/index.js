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
  const [temp, setTemp] = useState([]);


  useEffect(() => {
    async function initPetPage() {
      const response = await axios.get('http://localhost:4000/pets');
      setPets(response.data);
    }

    initPetPage();
  }, []);


  function search(searchName) {
    if (searchName) {
      const searchResult = pets.filter(pet => pet.name === searchName);
      if (searchResult.length >= 1) {
        setTemp(pets);
        setPets(searchResult);
      }
    } else {
      setPets(temp);
      setTemp([])
    }
  }

  return (
    <div className="pets-container">
      <Header />
      <Navigation linkPath={'/home'} />
      <MenuBar search={search} />
      <div className="pets-cards">

        {
          temp.length === 0 ? <CardCreatePet /> : null
        }

        {
          pets.map(pet => (
            <CardPet key={pet.id} data={pet} avatarTemp={avatarTemp} />
          ))
        }
      </div>
    </div>
  );
}
