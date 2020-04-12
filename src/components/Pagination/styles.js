import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-top: 2%;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  color: #F45D73;
  border: 1px solid #F45D73;
  border-radius: 100%;
  margin-right: 4px;
  transition: .2s;

  :hover {
    border: 1px solid transparent;
    color: #FFF;
    background: #F45D73;
  }
`;
