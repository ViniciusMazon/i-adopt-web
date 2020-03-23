import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

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
  StatusText
} from './styles';

import imageTemp from '../../assets/temp-avatar-dog.jpg';

export default function Application() {

  const [applicationsList, setApplicationsList] = useState([]);

  const token_bearer = sessionStorage.getItem('IAdopt_session');

  useEffect(() => {
    async function applicationListLoad() {
      const response = await axios.get('http://localhost:4000/applications', {
        headers: { Authorization: token_bearer }
      });
      setApplicationsList(response.data);
    }

    applicationListLoad();
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

  function search() { }
  function filter() { }
  function closeFilterAndSearch() { }

  return (
    <Container>
      <NavBar />
      <SearchAndFilter />
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
            <TableColum>
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
              <TableRowButton width={'16%'}>
                <Link to={`/applications/review/${application.application_id}`}>
                  Review <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
                </Link>
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
    </Container >
  );
}
