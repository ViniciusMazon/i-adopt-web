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

export const Table = styled.table`
  width: 70%;
  padding: 5%;
`;

export const TableHeaderColumn = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 15px;
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

export const Status = styled.div`
  width: 90px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${props => props.color};
  border-radius: 10px;
`;

export const StatusText = styled.p`
  color: ${props => props.color};
  margin: 5px;
  font-size: 12px;
  font-weight: normal;
  padding: 3px 0 3px 0;
`;

// Review

export const ContainerReview = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 40%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #FFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  margin-top: 15%;
  border-radius: 3px;
`;

export const ContentReview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #FFF;
  padding: 20px 30px 20px 30px;
  overflow: auto;
`;

export const Header = styled.p`
  font-weight: bold;
  color: #666;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid #DDDD;
  padding: 3px 0 3px 0;
`;

export const IconStatus = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: ${props => props.color};
  margin-right: 6px;
`;

export const PetInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3%;

  h1 {
    font-size: 25px;
    font-weight: bold;
    color: #666666;
    margin-bottom: 1%;
    margin-top: 2%;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

export const AvatarReview = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  margin-right: 10px;
`;

export const PetData = styled.div`
  width: 100%;
`;

export const Section = styled.div`
  width: 100%;
  border-bottom: 1px solid #DDDDDD;
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

