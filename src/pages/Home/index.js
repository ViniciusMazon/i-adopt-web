import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';
import Header from '../../components/Header';

export default function Home({ match }) {

  const [userName, setUserName] = useState('');
  const [pets, setPets] = useState([]);
  const [dogs, setDogs] = useState(0);
  const [cats, setCats] = useState(0);


  useEffect(() => {
    async function getPets() {
      const response = await axios.get("http://localhost:4000/pets");
      setPets(response.data);
    }

    setUserName(match.params.first_name)
    getPets()
  }, []);

  useEffect(() => {
    function createStatistics() {
      let dog = 0;
      let cat = 0;
      pets.map(pet => pet.specie === 'dog' ? dog++ : cat++);
      setDogs(dog);
      setCats(cat);
    }

    createStatistics();
  }, [pets]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">


          <h1>Welcome, {userName}!</h1>

          <h2>Pets</h2>
          <div className="board-container">
            <div className="board">
              <p>{dogs}</p>
              <p>Dogs</p>
            </div>
            <div className="board">
              <p>{cats}</p>
              <p>Cats</p>
            </div>
          </div>

          <h2>Applications</h2>
          <div className="board-container">
            <div className="board">
              <p>80</p>
              <p>Aproved</p>
            </div>
            <div className="board">
              <p>20</p>
              <p>Unread</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
