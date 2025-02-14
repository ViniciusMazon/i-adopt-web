import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faCalendar, faRulerVertical, faMars, faCat } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../../components/NavBar';
import Alert from '../../components/Alert';
import Pagination from '../../components/Pagination';
import SearchAndFilter from './components/index';

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
  Button,
  AlertZone
} from './styles';


function ApplicationReview({ cancel, changeStatus }) {

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [applicationData, setApplicationData] = useState({});

  useEffect(() => {
    async function applicationDataLoad(application_id) {
      const response = await axios.get(`http://localhost:4000/applications/review?id=${application_id}&page=1`, {
        headers: { Authorization: token_bearer }
      });
      setApplicationData(response.data.applications[0]);
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

    const applicationId = applicationData.application_id;
    const newStatusData = {
      status: newStatus
    }

    await changeStatus(applicationId, newStatusData);
    sessionStorage.removeItem('iAdopt_ApplicationId');
    cancel();
  }

  function handlerCancel() {
    sessionStorage.removeItem('iAdopt_ApplicationId');
    cancel();
  }

  return (
    <ContainerReview>
      <Modal>
        <Header>
          Application Review
        </Header>
        <PetInfo>
          <AvatarReview src={applicationData.pet_url} />
          <h1>{applicationData.pet_name}</h1>
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
              <Line>Name: {applicationData.tutor_name + ' ' + applicationData.tutor_last_name}</Line>
              <Line>Age: {applicationData.date_of_birth}</Line>
              <Line>Marital status: {applicationData.marital_status}</Line>
              <Line>Profession: {applicationData.profession}</Line>
            </Section>
            <Section>
              <Title>About the residence</Title>
              <Line>Type of residence: {applicationData.type_of_residence}</Line>
              <Line>Number of adults at home: {applicationData.adult_residents}</Line>
              <Line>Number of children at home: {applicationData.children_residents}</Line>
              <Line>Has smokers at home: {applicationData.has_smokers? 'Yes': 'No'}</Line>
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
              <Line>Have you adopted an animal before? {applicationData.already_adopted? 'Yes': 'No'}</Line>
              <Line>Are there other animals at home? {applicationData.animals_home? 'Yes': 'No'}</Line>
              <Line>Have any dogs or cats in the house been ill in the past few months? {applicationData.sick_animals_home? 'Yes': 'No'}</Line>
              <Line>Are you aware that you will have to add food, vaccines and veterinary care to your budget? {applicationData.add_budget_spend? 'Yes': 'No'}</Line>
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

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [applicationsList, setApplicationsList] = useState([]);
  const [filters, setFilters] = useState({
    status: "'accept','new','adopted','rejected','canceled'"
  });
  const [isReviewing, setIsReviewing] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

  async function applicationListLoad() {
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/applications?organization_id=${decoded.payload.org_id}&page=${currentPage}&status=${filters.status}`, {
      headers: { Authorization: token_bearer }
    });
    const { applications, total } = response.data;
    setApplicationsList(applications);
    setTotalPage(total);
  }

  useEffect(() => {
    applicationListLoad();
  }, []);

  useEffect(() => {
    console.log(applicationsList)
  }, [applicationsList])

  async function nextPage(page) {
    setCurrentPage(page);
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/applications?organization_id=${decoded.payload.org_id}&page=${page}&status=${filters.status}`, {
      headers: { Authorization: token_bearer }
    });
    const { applications, total } = response.data;
    setApplicationsList(applications);
  }

  async function resetSearch() {
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/applications?organization_id=${decoded.payload.org_id}&page=${currentPage}&status=${filters.status}`, {
      headers: { Authorization: token_bearer }
    });
    const { applications, total } = response.data;
    setApplicationsList(applications);
    setTotalPage(total);
  }

  async function search(app_id, pet_name) {
    const response = await axios.get(`http://localhost:4000/applications/review?id=${app_id}&pet_name=${pet_name}`, {
      headers: { Authorization: token_bearer }
    });
    const { applications, total } = response.data;
    setApplicationsList(applications);
    setTotalPage(total);
  }


  function applicationReview(application_id) {
    setIsReviewing(true);
    sessionStorage.setItem('iAdopt_ApplicationId', application_id);
  }

  async function applicationChangeStatus(applicationId, newStatusData) {
    await axios.put(`http://localhost:4000/applications/status?id=${applicationId}`, newStatusData, {
      headers: { Authorization: token_bearer }
    });

    await applicationListLoad();

    setAlertInfo({
      type: 'success',
      message: 'Status changed successfully'
    });
    setIsAlerting(true);
    setTimeout(() => {
      setIsAlerting(false);
    }, 3000);
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



  async function filter(filters) {
    setFilters(filters);
    const [, token] = token_bearer.split(' ');
    var decoded = jwt.decode(token, { complete: true });
    const response = await axios.get(`http://localhost:4000/applications?organization_id=${decoded.payload.org_id}&page=${currentPage}&status=${filters.status}`, {
      headers: { Authorization: token_bearer }
    });
    const { applications, total } = response.data;
    setApplicationsList(applications);
    setTotalPage(total);
  }


  return (
    <Container>
      <NavBar active={'applications'} />
      <AlertZone>
        {
          isAlerting ? <Alert type={alertInfo.type} message={alertInfo.message} /> : null
        }
      </AlertZone>
      {
        isReviewing ? <ApplicationReview cancel={() => setIsReviewing(false)} changeStatus={applicationChangeStatus} /> : null
      }
      <SearchAndFilter searchFunction={search} resetSearch={resetSearch} filterFunction={filter} />
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
                <Avatar src={application.pet_url} />
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
      <Pagination numberOfPages={Array.from(Array(totalPage).keys())} selectPage={nextPage} active={currentPage - 1} />
    </Container >
  );
}
