import React from 'react';
import './styles.css';

export default function ErrorBallon({ message }) {
  return (
    <div className="error-container">
      <p>{message}</p>
    </div>
  );
}
