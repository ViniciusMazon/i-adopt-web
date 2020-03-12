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
    <div className="CardCreatePet-container" onClick={handleCreateNewCard}>
      <div className="CardCreatePet-header"></div>

      <div className="CardCreatePet-body" >
        <span className="CardCreatePet-circle">
          <FontAwesomeIcon icon={faPlus} className="CardCreatePet-icon" />
        </span>

        Create new pet

      </div>

      <div className="CardCreatePet-footer"></div>
    </div >
  );
}
