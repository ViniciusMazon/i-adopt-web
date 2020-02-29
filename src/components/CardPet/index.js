import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faDog, faMale, faFemale, faRulerVertical } from '@fortawesome/free-solid-svg-icons'

import './styles.css';


export default function CardPet({ data, avatarTemp }) {

  let history = useHistory();
  const { id, name, specie, gender, size, avatar, date } = data;

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
        <img src={avatarTemp} alt="Pet picture" />
        <div>
          <span>
            <FontAwesomeIcon icon={specie === 'dog' ? faDog : faCat} className="cardpet-icon icon" />
            <p>{specie}</p>
          </span>
          <h3>{name}</h3>
          <span>
            <FontAwesomeIcon icon={gender === 'male' ? faMale : faFemale} className="cardpet-icon icon" />
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