import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Container, Image } from './styles';

export default function ImagePreview({ src, onRemoveImage }) {
  return (
    <Container>
      <Image src={src} />
      <FontAwesomeIcon icon={faTimesCircle} color={'#F67280'} onClick={onRemoveImage}/>
    </Container>
  );
}
