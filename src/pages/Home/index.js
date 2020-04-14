import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import NavBar from '../../components/NavBar';
import BackgroundImage from '../../assets/home-bg.png';

import {
  Container,
  HorizontalBackground,
  UserName,
  ShelterInformation,
  ShelterData,
  ButtonGoApplication
} from './styles';

export default function Home() {

  let history = useHistory();

  const token_bearer = sessionStorage.getItem('IAdopt_session');
  const [dogGender, setDogGender] = useState({});
  const [catGender, setCatGender] = useState({});
  const [dogSize, SetDogSize] = useState({});
  const [catSize, SetCatSize] = useState({});
  const [dogApplication, setDogApplication] = useState({});
  const [catApplication, setCatApplication] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function reportInit() {
      const [, token] = token_bearer.split(' ');
      var decoded = jwt.decode(token, { complete: true });
      const response = await axios.get(`http://localhost:4000/report/organization?organization_id=${decoded.payload.org_id}`);
      setDogGender(response.data.dog.gender);
      setCatGender(response.data.cat.gender);
      SetDogSize(response.data.dog.size);
      SetCatSize(response.data.cat.size);
      setDogApplication(response.data.dog.status);
      setCatApplication(response.data.cat.status);
    }

    setIsLoading(true);
    reportInit();
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <NavBar active={'home'}/>
      <HorizontalBackground src={BackgroundImage}>
        <UserName>Hey Vinicius!</UserName>
        <ShelterInformation>Your shelter saved {catApplication.accept + dogApplication.accept} lifes</ShelterInformation>
      </HorizontalBackground>
      {
        isLoading ? <p>Loading...</p> : (
          <ShelterData>
            <th></th>
            <th colspan="2">Gender</th>
            <th colspan="3">Size</th>
            <th colspan="2">Applications</th>
            <tr>
              <td></td>
              <td>Female</td>
              <td>Male</td>
              <td>Small</td>
              <td>Medium</td>
              <td>Big</td>
              <td>Rejected</td>
              <td>Accepted</td>
            </tr>
            <tr>
              <td>Dogs</td>
              <td>{dogGender.female}</td>
              <td>{dogGender.male}</td>
              <td>{dogSize.small}</td>
              <td>{dogSize.medium}</td>
              <td>{dogSize.big}</td>
              <td>{dogApplication.rejected}</td>
              <td>{dogApplication.accept}</td>
            </tr>
            <tr>
              <td>Cats</td>
              <td>{catGender.female}</td>
              <td>{catGender.male}</td>
              <td>{catSize.small}</td>
              <td>{catSize.medium}</td>
              <td>{catSize.big}</td>
              <td>{catApplication.rejected}</td>
              <td>{catApplication.accept}</td>
            </tr>
          </ShelterData>
        )
      }
      <ButtonGoApplication onClick={() => history.push('/applications')}>
        You have {catApplication.new + dogApplication.new} new applications, click here for review
      </ButtonGoApplication>
    </Container>
  );
}
