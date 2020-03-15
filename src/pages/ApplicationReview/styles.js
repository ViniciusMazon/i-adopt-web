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
  height: 100%;
  display: flex;
  flex-direction: column;
  background: '#FBFAF9';
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
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
  margin-bottom: 3%;

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

export const PetData = styled.div`

`;

export const Section = styled.div`
  width: 100%;
  border-top: 1px solid #DDDDDD;
  margin-top: 3%;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: #333;
  margin: 1.5% 0 1.5% 0;
`;

export const Line = styled.p`
font-size: 16px;
color: #666;
margin-bottom: 1%;
`;

export const TextArea = styled.p`
font-size: 16px;
color: #666;
background: #DDD;
padding: 1%;
margin-bottom: 1%;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 18px;
  color: #FFF;
  background: ${props => props.backColor};
  border-style: none;
  border-radius: 6px;
  margin-top: 4%;

  :hover {
    background: ${props => props.backColorHover};
    transition: 1s;
  }
`;
