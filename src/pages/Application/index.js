import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faCalendar, faRulerVertical, faMars, faCat } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../../components/NavBar';
import SearchAndFilter from '../../components/SearchAndFilter';

import {
  Container,
  Table,
  TableHeaderColumn,
  TableHeaderRow,
  TableColum,
  TableRow,
  TableRowButton,
  Avatar,
  Status,
  StatusText,
  ContainerReview,
  Modal,
  ContentReview,
  Header,
  PetInfo,
  AvatarReview,
  PetData,
  Section,
  Title,
  Line,
  TextArea,
  Footer,
  Button
} from './styles';

import imageTemp from '../../assets/temp-avatar-dog.jpg';


function ApplicationReview({ cancel, changeStatus }) {

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [applicationData, setApplicationData] = useState({});

  useEffect(() => {
    async function applicationDataLoad(application_id) {
      const response = await axios.get(`http://localhost:4000/applications/review?id=${application_id}`, {
        headers: { Authorization: token_bearer }
      });
      setApplicationData(response.data);
    }

    const application_id = sessionStorage.getItem('iAdopt_ApplicationId');
    applicationDataLoad(application_id);
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

  async function handlerChangeStatus(newStatus) {

    const applicationId = applicationData.id_application;
    const newStatusData = {
      status: newStatus
    }

    await changeStatus(applicationId, newStatusData);
    sessionStorage.removeItem('iAdopt_ApplicationId');
    cancel();
  }

  function handlerCancel() {
    cancel();
  }

  return (
    <ContainerReview>
      <Modal>
        <Header>
          Application Review
        </Header>
        <PetInfo>
          <AvatarReview src={imageTemp} />
          <h1>{applicationData.name}</h1>
          <span style={{ marginBottom: 30 }}>
            <Status color={statusColor(applicationData.status)}>
              <StatusText color={statusColor(applicationData.status)}>{applicationData.status}</StatusText>
            </Status>
          </span>
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
        <ContentReview>
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
        </ContentReview>
        <Footer>
          <Button color={'#666'} colorHover={'#F67280'} onClick={handlerCancel}>Cancel</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={() => handlerChangeStatus('rejected')}>Reject</Button>
          <Button color={'#666'} colorHover={'#F67280'} onClick={() => handlerChangeStatus('accept')}>Accept</Button>
        </Footer>
      </Modal>
    </ContainerReview>
  );
}

export default function Application() {

  const [applicationsList, setApplicationsList] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  async function applicationListLoad() {
    const response = await axios.get('http://localhost:4000/applications', {
      headers: { Authorization: token_bearer }
    });
    setApplicationsList(response.data);
  }

  useEffect(() => {
    applicationListLoad();
  }, []);

  function applicationReview(application_id) {
    setIsReviewing(true);
    sessionStorage.setItem('iAdopt_ApplicationId', application_id);
  }

  async function applicationChangeStatus(applicationId, newStatusData) {
    await axios.put(`http://localhost:4000/applications/status?id=${applicationId}`, newStatusData, {
      headers: { Authorization: token_bearer }
    });

    await applicationListLoad();
  }

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


  return (
    <Container>
      <NavBar />
      <SearchAndFilter />
      {
        isReviewing ? <ApplicationReview cancel={() => setIsReviewing(false)} changeStatus={applicationChangeStatus} /> : null
      }
      <Table>
        <TableHeaderColumn>
          <TableHeaderRow width={'8%'}>ID</TableHeaderRow>
          <TableHeaderRow width={'20%'}>Pet</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Pet id</TableHeaderRow>
          <TableHeaderRow width={'15%'}>Tutor</TableHeaderRow>
          <TableHeaderRow width={'8%'}>Tutor id</TableHeaderRow>
          <TableHeaderRow width={'12%'}>Date</TableHeaderRow>
          <TableHeaderRow width={'13%'}>Status</TableHeaderRow>
          <TableHeaderRow width={'16%'}>Action</TableHeaderRow>
        </TableHeaderColumn>
        {
          applicationsList.map(application => (
            <TableColum key={application.application_id}>
              <TableRow width={'8%'}>{application.application_id}</TableRow>
              <TableRow width={'20%'}>
                <Avatar src={imageTemp} />
                {application.pet_name}
              </TableRow>
              <TableRow width={'8%'}>{application.pet_id}</TableRow>
              <TableRow width={'15%'}>{application.tutor_name}</TableRow>
              <TableRow width={'8%'}>{application.tutor_id}</TableRow>
              <TableRow width={'12%'}>{application.date_creation.split('T')[0]}</TableRow>
              <TableRow width={'13%'}>
                <Status color={statusColor(application.status)}>
                  <StatusText color={statusColor(application.status)}>{application.status}</StatusText>
                </Status>
              </TableRow >
              <TableRowButton width={'16%'} onClick={() => applicationReview(application.application_id)}>
                Review
                <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
    </Container >
  );
}
