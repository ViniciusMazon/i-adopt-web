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


  useEffect(() => {
    async function initPetPage() {
      const response = await axios.get('http://localhost:4000/pets');
      setPets(response.data);
    }

    initPetPage();
  }, []);


  async function search(filterName) {

    if (filterName) {
      const response = await axios.get(`http://localhost:4000/pets/?name=${filterName}`);
      setPets(response.data);
    } else {
      const response = await axios.get('http://localhost:4000/pets');
      setPets(response.data);
    }
  }

  //deve filtrar um pet por specie, genero ou tamanho

  return (
    <div className="pets-container">
      <Header />
      <Navigation linkPath={'/home'} />
      <MenuBar search={search} />
      <div className="pets-cards">
      <CardCreatePet />

        {
          pets.map(pet => (
            <CardPet key={pet.id} data={pet} avatarTemp={avatarTemp} />
          ))
        }
      </div>
    </div>
  );
}
