import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SideBackground = styled.div`
  width: 50%;
  height:100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

export const Content = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 80%;
    margin-bottom: 30px;
  }

  input {
    width: 100%;
    height: 45px;
    border: none;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #333333;
    margin-bottom: 25px;
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }

  select {
    width: 100%;
    height: 45px;
    border: none;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #333333;
    margin-bottom: 10px;
  }

  a {
    margin-top: 30px;
    font-family: 'Roboto', 'Arial', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #F67280;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    margin-top: 30px;
    width: 300px;
    height: 45px;
    background: #F67280;
    border: none;
    border-radius: 6px;
    font-family: 'Roboto', 'Arial', sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
    cursor: pointer;
  }

  button:hover {
    background: rgb(202, 89, 100);
  }

  p {
    width: 100%;
    text-align: center;
  }
`;

export const Navigation = styled.p`
  width: 100%;
  display: flex;
  justify-content: ${props => props.position};
  margin-top: 30px;
  font-family: 'Roboto', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #F67280;
  text-decoration: none;
  cursor: pointer;

  :hover {
  text-decoration: underline;
  }
`;
