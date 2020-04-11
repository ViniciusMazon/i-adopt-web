import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', 'Arial', sans-serif;
  padding-top: 3.4%;
`;

export const HorizontalBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 60%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  -webkit-mask-image: linear-gradient(to top, transparent 1%, black 2%);
`;

export const UserName = styled.h1`
  font-size: 63.1707px;
  color: #FFF;
  margin-left: 2%;
`;

export const ShelterInformation = styled.h2`
  font-size: 30px;
  color: #FFF;
  margin-left: 2%;
  margin-bottom: 2%;
`;

export const ShelterData = styled.table`
  width: 40%;
  margin: 3% 0 3% 0;
  text-align: center;

  th, tr, td {
    padding: 5px;
    font-size: 19px;
    color: #666;
  }

  tr {
    border-top: 1px solid #ddd;
  }
`;

export const ButtonGoApplication = styled.button`
  width: 401px;
  height: 45px;
  background: #F67280;
  border: none;
  border-radius: 6px;
  color: #FFF;

  :hover {
    background: rgb(202, 89, 100);
  }
`;
