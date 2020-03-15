import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import MenuBar from '../../components/MenuBar';
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
  IconStatus,
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
      <MenuBar search={() => { }} filter={() => { }} closeFilterAndSearch={() => { }} />

      <Table>
        <TableHeaderColumn>
          <TableHeaderRow>ID</TableHeaderRow>
          <TableHeaderRow>Pet</TableHeaderRow>
          <TableHeaderRow>Pet id</TableHeaderRow>
          <TableHeaderRow>Tutor</TableHeaderRow>
          <TableHeaderRow>Tutor id</TableHeaderRow>
          <TableHeaderRow>Date</TableHeaderRow>
          <TableHeaderRow>Status</TableHeaderRow>
          <TableHeaderRow>Action</TableHeaderRow>
        </TableHeaderColumn>
        {
          applicationsList.map(application => (
            <TableColum>
              <TableRow>{application.application_id}</TableRow>
              <TableRow>
                <Avatar src={imageTemp} />
                {application.pet_name}
              </TableRow>
              <TableRow>{application.pet_id}</TableRow>
              <TableRow>{application.tutor_name}</TableRow>
              <TableRow>{application.tutor_id}</TableRow>
              <TableRow>{application.date_creation.split('T')[0]}</TableRow>
              <TableRow>
                <Status>
                  <IconStatus color={statusColor(application.status)} />
                  <StatusText color={statusColor(application.status)}>{application.status}</StatusText>
                </Status>
              </TableRow>
              <TableRowButton>
                <Link to={`/applications/review/${application.application_id}`}>
                  <FontAwesomeIcon icon={faAngleRight} color={'#F67280'} />
                </Link>
              </TableRowButton>
            </TableColum>
          ))
        }
      </Table>
    </Container >
  );
}
