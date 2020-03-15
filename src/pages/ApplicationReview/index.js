import React from 'react';
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
  Button,
} from './styles';

export default function ApplicationReview() {
  return (
    <Container>
      <Content>
        <Header>
          <Navigation linkPath={'/applications'} />
          <Status>
            <IconStatus color={'#8C97F9'} />
            <StatusText color={'#8C97F9'}>new</StatusText>
          </Status>
        </Header>
        <PetInfo>
          <Avatar src={image} />
          <h1>Vanilla</h1>
          <div>
            <span>
              <FontAwesomeIcon icon={faCat} color={'#666'} />
              <p>Cat</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faMars} color={'#666'} />
              <p>Male</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faRulerVertical} color={'#666'} />
              <p>Medium</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendar} color={'#666'} />
              <p>2020-03-14</p>
            </span>
          </div>
        </PetInfo>
        <Button backColor={'#FF9999'} backColorHover={'#CF7878'}>Reject</Button>
        <Button backColor={'#118696'} backColorHover={'#0C636F'}>Aprove</Button>
      </Content>
    </Container>
  );
}
