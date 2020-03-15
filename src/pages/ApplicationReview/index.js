import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faMars, faVenus, faRulerVertical, faCalendar } from '@fortawesome/free-solid-svg-icons'

import Navigation from '../../components/Navigation';
import image from '../../assets/temp-avatar-dog.jpg';
import {
  Container,
  Content,
  Header,
  Status,
  IconStatus,
  StatusText,
  Avatar,
  PetInfo,
  PetData,
  Section,
  Title,
  Line,
  TextArea,
  Button
} from './styles';

export default function ApplicationReview({ match }) {

  let history = useHistory();
  const [applicationData, setApplicationData] = useState({});

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  useEffect(() => {
    async function applicationDataLoad(id) {
      const response = await axios.get(`http://localhost:4000/applications/review?id=${id}`, {
        headers: { Authorization: token_bearer }
      });
      setApplicationData(response.data);
    }
    const id = match.params.id;
    applicationDataLoad(id);
  }, []);

  function statusColor(status) {
    var color = '';
    switch (status) {
      case 'new':
        color = '#8C97F9';
        break;
      case 'accept':
        color = '#4AFF1D';
        break;
      case 'adopted':
        color = '#FF9999';
        break;
      case 'canceled':
        color = '#666666';
        break;
      case 'rejected':
        color = '#D32A34';
        break;
      default:
        color = '#DDD';
        break;
    }
    return color;
  }

  async function handlerStatus(status) {
    const data = {
      status: status
    }

    await axios.put(`http://localhost:4000/applications/status?id=${applicationData.id_application}`, data, {
      headers: { Authorization: token_bearer }
    });

    history.push('/applications');
  }

  return (
    <Container>
      <Content>
        <Header>
          <Navigation linkPath={'/applications'} />
          <Status>
            <IconStatus color={statusColor(applicationData.status)} />
            <StatusText color={statusColor(applicationData.status)}>{applicationData.status}</StatusText>
          </Status>
        </Header>
        <PetInfo>
          <Avatar src={image} />
          <h1>{applicationData.name}</h1>
          <div>
            <span>
              <FontAwesomeIcon icon={faCat} color={'#666'} />
              <p>{applicationData.specie}</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faMars} color={'#666'} />
              <p>{applicationData.gender}</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faRulerVertical} color={'#666'} />
              <p>{applicationData.gender}</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendar} color={'#666'} />
              <p>{applicationData.date_creation}</p>
            </span>
          </div>
        </PetInfo>
        <PetData>
          <Section>
            <Title>About the tutor</Title>
            <Line>Name: {applicationData.first_name + ' ' + applicationData.last_name}</Line>
            <Line>Age: {applicationData.date_of_birth}</Line>
            <Line>Marital status: {applicationData.marital_status}</Line>
            <Line>Profession: {applicationData.profession}</Line>
          </Section>
          <Section>
            <Title>About the residence</Title>
            <Line>Type of residence: {applicationData.type_of_residence}</Line>
            <Line>Number of adults at home: {applicationData.adult_residents}</Line>
            <Line>Number of children at home: {applicationData.children_residents}</Line>
            <Line>Has smokers at home: {applicationData.has_smokers}</Line>
            <Line>Address: {
              applicationData.street + ', ' +
              applicationData.num + ', ' +
              applicationData.neighborhood + ', ' +
              applicationData.city + ' - ' +
              applicationData.region
            }</Line>
          </Section>
          <Section>
            <Title>Historic</Title>
            <Line>Have you adopted an animal before? {applicationData.already_adopted}</Line>
            <Line>Are there other animals at home? {applicationData.animals_home}</Line>
            <Line>Have any dogs or cats in the house been ill in the past few months? {applicationData.sick_animals_home}</Line>
            <Line>Are you aware that you will have to add food, vaccines and veterinary care to your budget? {applicationData.add_budget_spend}</Line>
            <Line>Why do you want to adopt the  {applicationData.name}</Line>
            <TextArea>{applicationData.why_want_adopt}</TextArea>
            <Line>Do you have any questions about the adoption process or the  {applicationData.name} ?</Line>
            <TextArea>{applicationData.have_questions}</TextArea>
          </Section>
          <Section>
            <Title>Contact</Title>
            <Line>Email: {applicationData.email}</Line>
            <Line>Phone: {applicationData.area_code + ' ' + applicationData.phone}</Line>
          </Section>
        </PetData>
        <Button backColor={'#FF9999'} backColorHover={'#CF7878'} onClick={() => handlerStatus('rejected')}>Reject</Button>
        <Button backColor={'#118696'} backColorHover={'#0C636F'} onClick={() => handlerStatus('accept')}>Accept</Button>
      </Content>
    </Container>
  );
}
