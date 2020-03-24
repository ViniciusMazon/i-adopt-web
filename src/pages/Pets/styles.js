import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', 'Arial', sans-serif;
  padding-top: 5%;
`;

export const ButtonNewPet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  background: #F67280;
  border-radius: 2px;
  padding: 3px 0 3px 0;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: normal;
  color: #FFF;
  cursor: pointer;

  :hover {
    background: #F45D73;
  }
`;

export const Table = styled.table`
  width: 70%;
  padding: 5%;
`;

export const TableHeaderColumn = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
`;

export const TableHeaderRow = styled.th`
  width: ${props => props.width};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #666;
`;

export const TableColum = styled.tr`
  width: 100%;
  display: flex;
  color: #666;
  font-size: 14px;
  border-top: solid 0.5px #DDD;
  padding: 10px 0 10px 0;
`;

export const TableRow = styled.td`
  width: ${props => props.width};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const TableRowButton = styled(TableRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  a {
    color: #F67280;
  }
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  margin-right: 10px;
`;


export const Content = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #FFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

export const Header = styled.p`
  font-weight: bold;
  color: #666;
  text-align: center;
  width: 100%;
  border-bottom: solid 1px #DDD;
  padding: 3px 0 3px 0;
`;

export const ImageUpload = styled.div`
  width: 130px;
  height: 130px;
  border: solid 1px #DDD;
  border-radius: 100%;
  text-align: center;

  input {
    color: transparent;
  }
`;

export const Input = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;

  label {
    font-size: 15px;
    color: #666;
  }

  input {
    border: none;
    border-bottom: solid 1px #DDD;
  }

  input:valid {
    border-color: green;
  }

  input:invalid {
    border-color: tomato;
  }

`;

export const Select = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;

  select {
    border: solid 1px #DDD;
  }

  select:valid {
    border-color: green;
  }

  select:invalid {
    border-color: tomato;
  }

  label {
    font-size: 15px;
    color: #666;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background: #EEE;
  padding: 3px 20px 3px 0;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  color: ${props => props.color};
  font-weight: 500;

  :hover {
    color: ${props => props.colorHover};
  }
`;
