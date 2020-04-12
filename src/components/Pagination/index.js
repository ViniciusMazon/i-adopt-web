import React from 'react';

import {
  Container,
  Button
} from './styles';

export default function Pagination({ numberOfPages, selectPage }) {

  function handlerChangePage(e) {
    selectPage(e.target.innerText);
  }

  return (
    <Container>
      {
        numberOfPages.map(page =>
          <Button onClick={e => handlerChangePage(e)}>{page + 1}</Button>
        )
      }
    </Container>
  )
}


