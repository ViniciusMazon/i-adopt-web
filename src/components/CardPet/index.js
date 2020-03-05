import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd, faCat, faDog, faMars, faVenus, faRulerVertical } from '@fortawesome/free-solid-svg-icons'

import './styles.css';
import avatarDog from '../../assets/temp-avatar-dog.jpg';
import avatarCat from '../../assets/temp-avatar-cat.jpg';

export default function CardPet({ data }) {

  let history = useHistory();

  const { id, name, price, specie, gender, size, avatar, date } = data;

  function handleEdit() {
    history.push(`/pets/${id}`);
  }

  return (
    <div className="card-container">
      <div className="card-header">
        <p>{id}</p>
        <p>{date}</p>
      </div>

      <div className="card-body">
        <img src={specie === 'dog'? avatarDog : avatarCat} alt="Pet picture" />
        <div>
          <h3>{name}</h3>
          <span>
            <FontAwesomeIcon icon={specie === 'dog' ? faDog : faCat} className="cardpet-icon icon" />
            <p>{specie}</p>
            <FontAwesomeIcon icon={faHandHoldingUsd} className="cardpet-icon icon" />
            <p>{price === '' ? 'free' : `US$${price}`}</p>
          </span>
          <span>
            <FontAwesomeIcon icon={gender === 'male' ? faMars : faVenus} className="cardpet-icon icon" />
            <p>{gender}</p>
            <FontAwesomeIcon icon={faRulerVertical} className="cardpet-icon icon" />
            <p>{size}</p>
          </span>
        </div>
      </div>

      <div className="card-footer">
        <button onClick={handleEdit}>Edit</button>
        <button id="application">Application</button>
      </div>
    </div >
  );
}
