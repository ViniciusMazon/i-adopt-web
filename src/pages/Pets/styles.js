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
  background: #FBFAF9;
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
  font-weight: normal;
  color: #666;
`;

export const TableColum = styled.tr`
  width: 100%;
  display: flex;
  color: #666;
  font-size: 14px;
  padding-bottom: 15px;
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
