import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './styles.css';


export default function CardCreatePet({ data, avatarTemp }) {

  let history = useHistory();

  function handleCreateNewCard() {
    history.push('/pets/new');
  }

  return (
    <div className="CardCreatePet-container">
      <div className="CardCreatePet-header"></div>

      <button className="CardCreatePet-body" onClick={handleCreateNewCard}>
        <span className="CardCreatePet-button">
          <FontAwesomeIcon icon={faPlus} className="CardCreatePet-icon" />
        </span>

        Create new pet

      </button>

      <div className="CardCreatePet-footer"></div>
    </div >
  );
}
