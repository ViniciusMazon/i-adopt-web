import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Content = styled.div`
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${props => props.primaryColor};
  color: ${props => props.secondaryColor};
  border-radius: 3px;
  opacity: 80%;
  padding: 10px 20px 10px 20px;
  transition: 1s;

  p {
    margin: 0 0 0 10px;
  }
`;
