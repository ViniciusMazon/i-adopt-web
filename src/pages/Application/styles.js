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
