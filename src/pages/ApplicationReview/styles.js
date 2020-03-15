import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', 'Arial', sans-serif;
  padding-top: 5%;
`;

export const Content = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
  /* background: '#FBFAF9'; */
`;

export const Status = styled.div`
  width: 90px;
  height: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const IconStatus = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: ${props => props.color};
  margin-right: 6px;
`;

export const StatusText = styled.p`
  color: ${props => props.color};
  margin: 5px;
`;

export const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  margin-bottom: 2%;
`;

export const PetInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #DDDDDD;

  h1 {
    font-size: 25px;
    font-weight: bold;
    color: #666666;
    margin-bottom: 4%;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2%;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin: 0 0 0 7px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 18px;
  color: #FFF;
  background: ${props => props.backColor};
  border-style: none;
  border-radius: 6px;
  margin-bottom: 4%;

  :hover {
    background: ${props => props.backColorHover};
    transition: 1s;
  }
`;
