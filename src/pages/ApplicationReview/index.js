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
  PetData,
  Section,
  Title,
  Line,
  TextArea,
  Button
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
        <PetData>
          <Section>
            <Title>About the tutor</Title>
            <Line>Name: Fulano Beltrano Citrano</Line>
            <Line>Age: 26</Line>
            <Line>Marital status: Single</Line>
            <Line>Profession: Developer</Line>
          </Section>
          <Section>
            <Title>About the residence</Title>
            <Line>Type of residence: House</Line>
            <Line>Number of adults at home: 2</Line>
            <Line>Number of children at home: 1</Line>
            <Line>Has smokers at home: No</Line>
            <Line>Address: Rua 24 de Outubro, 498, Centro, Barreiras - BA</Line>
          </Section>
          <Section>
            <Title>Historic</Title>
            <Line>Have you adopted an animal before? Yes</Line>
            <Line>Are there other animals at home? No</Line>
            <Line>Have any dogs or cats in the house been ill in the past few months? No</Line>
            <Line>Are you aware that you will have to add food, vaccines and veterinary care to your budget? Yes</Line>
            <Line>Why do you want to adopt the  PET NAME?</Line>
            <TextArea>Bla bla bla</TextArea>
            <Line>Do you have any questions about the adoption process or the  PET NAME ?</Line>
            <TextArea>Bla bla bla</TextArea>
          </Section>
          <Section>
            <Title>Contact</Title>
            <Line>Email: vnpmazon@gmail.com</Line>
            <Line>Phone: 77 99106-2220</Line>
          </Section>
        </PetData>
        <Button backColor={'#FF9999'} backColorHover={'#CF7878'}>Reject</Button>
        <Button backColor={'#118696'} backColorHover={'#0C636F'}>Aprove</Button>
      </Content>
    </Container>
  );
}
