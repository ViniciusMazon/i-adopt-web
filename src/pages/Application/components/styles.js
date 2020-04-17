import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  border-radius: 40px;
  padding: 10px;

  :hover > .text {
    width: 240px;
    padding: 0 6px;
  }

  :hover > .button {
    border: none;
  }

  :hover {
    border: solid 1px #F67280;
  }
`;

export const Text = styled.input`
  width: 0px;
  border: none;
  background: none;
  outline: none;
  padding: 0;
  font-size: 16px;
  transition: 0.5s;
  line-height: 40px;
`;

export const Select = styled.select`
  width: 0px;
  border: none;
  background: none;
  outline: none;
  padding: 0;
  font-size: 16px;
  transition: 0.5s;
  line-height: 40px;
`;

export const Button = styled.button`
  color: #F67280;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFF;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #F67280;
`;
