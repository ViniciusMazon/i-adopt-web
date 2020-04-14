import React from 'react';

import {
  Container,
  Button
} from './styles';

export default function Pagination({ numberOfPages, selectPage, active }) {

  function handlerChangePage(e) {
    selectPage(e.target.innerText);
  }

  return (
    <Container>
      {
        numberOfPages.map(page =>
          <Button
            color={active === page? '#FFF': '#F45D73'}
            bgColor={active === page? '#F45D73': 'none'}
            onClick={e => handlerChangePage(e)}>{page + 1}</Button>
        )
      }
    </Container>
  )
}


