import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'

import './styles.css';
import iconApplication from '../../assets/icon-application.png';
import iconHouse from '../../assets/icon-house.png';
import iconDog from '../../assets/icon-dog.png';
import iconCat from '../../assets/icon-cat.png';

export default function Home({ match }) {

  const [userName, setUserName] = useState('');
  const [pets, setPets] = useState([]);
  const [dogsInfo, setDogsInfo] = useState({});
  const [catsInfo, setCatsInfo] = useState({});



  useEffect(() => {
    async function getPets() {
      const response = await axios.get("http://localhost:4000/pets");
      setPets(response.data);
    }

    const user = JSON.parse(sessionStorage.getItem('IAdopt_user'));
    console.log(user)
    setUserName(user.first_name);
    getPets()
  }, []);

  useEffect(() => {
    function createStatistics() {
      let dog = {
        total: 0,
        male: 0,
        female: 0,
        small: 0,
        medium: 0,
        big: 0
      }

      let cat = {
        total: 0,
        male: 0,
        female: 0,
        small: 0,
        medium: 0,
        big: 0
      }

      pets.map(pet => {
        if (pet.specie === 'dog') {

          dog.total++;

          if (pet.gender === 'male') {
            dog.male++;
          } else {
            dog.female++;
          }

          switch (pet.size) {
            case 'small':
              dog.small++;
              break;
            case 'medium':
              dog.medium++;
              break;
            case 'big':
              dog.big++;
              break;
            default:
              console.log('erro na estatistica de dog size')
          }
        } else {

          cat.total++;

          if (pet.gender === 'male') {
            cat.male++;
          } else {
            cat.female++;
          }

          switch (pet.size) {
            case 'small':
              cat.small++;
              break;
            case 'medium':
              cat.medium++;
              break;
            case 'big':
              cat.big++;
              break;
            default:
              console.log('erro na estatistica de cat size')
          }
        }
      });

      setDogsInfo(dog);
      setCatsInfo(cat);
    }

    createStatistics();
  }, [pets]);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="board-container">

          <h1>Hey {userName}, look at this!</h1>

          <span>
            <h2>Your applications</h2>
            <div className="board-content">

              <div className="board">
                <img src={iconHouse} className="board-icon" />
                <strong className="board-numbers">INOP</strong>
                <p>Pets adopted</p>
              </div>

              <div className="board">
                <img src={iconApplication} className="board-icon" />
                <strong className="board-numbers">INOP</strong>
                <p>Pending applications</p>
              </div>
            </div>
          </span>

          <span>
            <h2>Your pets</h2>
            <div className="board-content">

              <div className="board">
                <div>
                  <img src={iconDog} className="board-icon" />
                </div>
                <div>
                  <span>
                    <strong className="board-numbers">{dogsInfo.total}</strong>
                    <p>Dogs</p>
                  </span>
                  <span className="board-gender">
                    <FontAwesomeIcon icon={faVenus} className="board-info-icon" />
                    <p>{dogsInfo.female}</p>
                    <FontAwesomeIcon icon={faMars} className="board-info-icon" />
                    <p>{dogsInfo.male}</p>
                  </span>
                  <span className="board-size">
                    <strong className="board-size-emphasis">S</strong>
                    <p>{dogsInfo.small}</p>
                    <strong className="board-size-emphasis">M</strong>
                    <p>{dogsInfo.medium}</p>
                    <strong className="board-size-emphasis">B</strong>
                    <p>{dogsInfo.big}</p>
                  </span>
                </div>
              </div>
              <div className="board">
                <div>
                  <img src={iconCat} className="board-icon" />
                </div>
                <div>
                  <span>
                    <strong className="board-numbers">{catsInfo.total}</strong>
                    <p>Cats</p>
                  </span>
                  <span className="board-gender">
                    <FontAwesomeIcon icon={faVenus} className="board-info-icon" />
                    <p>{catsInfo.female}</p>
                    <FontAwesomeIcon icon={faMars} className="board-info-icon" />
                    <p>{catsInfo.male}</p>
                  </span>
                  <span className="board-size">
                    <strong className="board-size-emphasis">S</strong>
                    <p>{catsInfo.small}</p>
                    <strong className="board-size-emphasis">M</strong>
                    <p>{catsInfo.medium}</p>
                    <strong className="board-size-emphasis">B</strong>
                    <p>{catsInfo.big}</p>
                  </span>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
