import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import RocketLogo from '../../assets/icons/PicsArt_04-14-04.42 1.svg';
import FilterHackathons from '../Hackathon Events/FilterHackathons';
import OrganizationStastics from './OrganizationStastics'
import ChallengesInfo from '../AI Challenges Partcipation/ChallengesInfo';

const Introduction = () => {
  const navigate = useNavigate();

  const createChallengeHandler = () => {
    navigate('/create-hackathon');
  }

  return (
    <>
      <Row className='row-body'>
        <Col md={7} className='intro-body'>
          <Container>
            <Row className='body-title'>Accelerate Innovation with Global AI Challenges</Row>
            <Row className='body-desc'>AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to a faster learning through competitions.</Row>
            <Row className='create-event-container'>
              <Button className='create-hackathon-btn' onClick={createChallengeHandler}>Create Challenge</Button>
            </Row>
          </Container>
        </Col>
        <Col md={5}><Image src={RocketLogo} style={{ width: 500, height: 400}}/></Col>
      </Row>

      <Row className='stastics-row'>
        <OrganizationStastics />
      </Row>

      <Row className='challanges-info-row'>
        <ChallengesInfo />
      </Row>

      <br />
    </>
  )
}

export default Introduction