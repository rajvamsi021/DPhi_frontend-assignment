import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { challengesInfoData } from '../../utils/homepageData';


const ChallengesInfo = () => {
  return (
    <Container>
      <div className='text-center info-title'>
        Why Partcipate in <span>AI Challenges?</span>
      </div>

      <div className='info-display'>
        {challengesInfoData.map((data, index) => (
          <div className='info-card' key={index}>
            <Image src={data.image} style={{ width: 50, height: 50}} alt={data.title}/>
            <div className='card-title'>{data.title}</div>
            <div className='info-description'>{data.description}</div>
        </div>
        ))}
      </div>

    </Container>
  )
}

export default ChallengesInfo