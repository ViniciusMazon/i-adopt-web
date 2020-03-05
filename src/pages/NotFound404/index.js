import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';
import image from '../../assets/404.png';

export default function NotFound404() {
  return (
    <div className="notFound-container">
      <div className="notFound-content">
        <img src={image} alt="" />
        <Link to="/">Ok</Link>
      </div>
    </div>
  );
}
