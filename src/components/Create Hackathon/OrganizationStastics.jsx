import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { stasticsData } from '../../utils/homepageData';

const OrganizationStastics = () => {

  return (
    <>
      {stasticsData.map((data, index) => (
        <Col key={index}>
          <Row className={index===stasticsData.length-1 ? 'stastics-display last-child' : 'stastics-display'}>
            <Col md={4}>
              <Image src={data.image} style={{ width: 60, height: 60}} alt={data.description}/>
            </Col>

            <Col md={8} className='stastics-data'>
              <Row className='stastics-number'>{data.number}</Row>
              <Row className='stastics-description'>{data.description}</Row>
            </Col>
          </Row>
        </Col>
      ))}

      {/* <Col>
      <Row className='stastics-display'>
        <Col md={4}>
          <Image src={AIStasticsLogo} style={{ width: 60, height: 60}}/>
        </Col>
        <Col md={8} className='stastics-data'>
          <Row>100K+</Row>
          <Row>AI model submission</Row>
        </Col>
      </Row>
      </Col>

      <Col>
      <Row className='stastics-display last-child'>
        <Col md={4}>
          <Image src={AIStasticsLogo} style={{ width: 60, height: 60}}/>
        </Col>
        <Col md={8} className='stastics-data'>
          <Row>100K+</Row>
          <Row>AI model submission</Row>
        </Col>
      </Row>
      </Col> */}
    </>
  )
}

export default OrganizationStastics