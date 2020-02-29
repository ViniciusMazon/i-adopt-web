import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import './styles.css';

export default function Search() {

  const [searchName, setSearchName] = useState('');

  return (
    <div className="search-container">
      <input type="text" placeholder="Name..." value={searchName} onChange={e => setSearchName(e.target.value)} />
      <button>
        <FontAwesomeIcon icon={faAngleRight} className="search-icon" />
      </button>
    </div>
  );
}
