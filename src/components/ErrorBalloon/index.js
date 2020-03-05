import React from 'react';
import './styles.css';

export default function ErrorBalloon({ message }) {
  return (
    <div className="error-container">
      <p>{message}</p>
    </div>
  );
}
