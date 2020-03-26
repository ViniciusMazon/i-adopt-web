import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

import {
  Container,
  Content
} from './styles';

export default function Alert({ type, message }) {

  const [color, setColor] = useState({});

  useEffect(() => {
    setColor(colorSelect(type));
  }, [])

  function colorSelect(type) {
    let colorPalette = {
      primaryColor: '',
      secondaryColor: ''
    }

    switch (type) {
      case 'success':
        colorPalette.primaryColor = '#D4EDDA';
        colorPalette.secondaryColor = '#155724';
        break;
      case 'alert':
        colorPalette.primaryColor = '#FFF3CD';
        colorPalette.secondaryColor = '#856404';
        break;
      case 'error':
        colorPalette.primaryColor = '#F8D7DA';
        colorPalette.secondaryColor = '#721c24';
        break;
      default:
        colorPalette.primaryColor = '#ddd';
        colorPalette.secondaryColor = '#333';
    }

    return colorPalette;
  }

  return (
    < Container >
      <Content primaryColor={color.primaryColor} secondaryColor={color.secondaryColor}>
        <FontAwesomeIcon icon={faCheck} />
        <p>{message}</p>
      </Content>
    </Container >
  );
}
