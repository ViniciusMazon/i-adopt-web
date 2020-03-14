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
  width: 80%;
`;

export const TableHeaderColumn = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
  background: #FBFAF9;
`;

export const TableHeaderRow = styled.th`
  width: 14.28%;
  font-size: 16px;
  font-weight: normal;
  color: #333;
`;

export const TableColum = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #FBFAF9;
  color: #666;
  font-size: 14px;
  padding-bottom: 8px;
`;

export const TableRow = styled.td`
  width: 14.28%;
`;

export const TableRowButton = styled(TableRow)`
  cursor: pointer;
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
