import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { status, daysFormat, hoursFormat, minutesFormat, eventsDateTimeFormat } from '../../utils/statusCalculator';

const AllHackathonEvents = ({hackathons}) => {
    const navigate = useNavigate();

    const participateHackathonHandler = (id) => {
        navigate(`/${id}`);
    }

  return (
    <div>
        {hackathons.length ?
            ( <div className='display-grid'>
                {hackathons.map((event, index) => (
                <div key={index} className='event-card' onClick={() => participateHackathonHandler(event.id)}>
                    <div>
                        <img src={event.eventImage} alt={event.eventName}/>
                    </div>
                    <div className='card-body'>
                        {status(event.startDate, event.endDate) === 'Upcoming' ? (
                            <>
                                <div className='event-status mb-3 mt-4'>{status(event.startDate, event.endDate)}</div>
                                <div className='event-name mb-3'>{event.eventName}</div>
                                <div className='time-title mb-1'>Starts in</div>
                                <Row className='time'>
                                    <Col md={2}>
                                        <Row className='current-time'>{daysFormat(new Date(event.startDate).getTime() - new Date().getTime())}</Row>
                                        <Row className='time-info'>Days</Row>
                                    </Col>
                                    <Col md={2} className='bold'>:</Col>
                                    <Col md={2}>
                                        <Row className='current-time'>{hoursFormat(new Date(event.startDate).getTime() - new Date().getTime())}</Row>
                                        <Row className='time-info'>Hours</Row>
                                    </Col>
                                    <Col md={2} className='bold'>:</Col>
                                    <Col md={2}>
                                        <Row className='current-time'>{minutesFormat(new Date(event.startDate).getTime() - new Date().getTime())}</Row>
                                        <Row className='time-info'>Mins</Row>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            status(event.startDate, event.endDate) === 'Active' ? (
                                <>
                                    <div className='event-status active mb-3 mt-4'>{status(event.startDate, event.endDate)}</div>
                                    <div className='event-name mb-3'>{event.eventName}</div>
                                    <div className='time-title mb-1'>Ends in</div>
                                    <Row className='time'>
                                        <Col md={2}>
                                            <Row className='current-time'>{daysFormat(new Date(event.endDate).getTime() - new Date().getTime())}</Row>
                                            <Row className='time-info'>Days</Row>
                                        </Col>
                                        <Col md={2} className='bold'>:</Col>
                                        <Col md={2}>
                                            <Row className='current-time'>{hoursFormat(new Date(event.endDate).getTime() - new Date().getTime())}</Row>
                                            <Row className='time-info'>Hours</Row>
                                        </Col>
                                        <Col md={2} className='bold'>:</Col>
                                        <Col md={2}>
                                            <Row className='current-time'>{minutesFormat(new Date(event.endDate).getTime() - new Date().getTime())}</Row>
                                            <Row className='time-info'>Mins</Row>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <>
                                    <div className='event-status past mb-3 mt-4'>{status(event.startDate, event.endDate)}</div>
                                    <div className='event-name mb-3'>{event.eventName}</div>
                                    <div className='time-title mb-3'>Ended On</div>
                                    <div className='past-event-format'>{eventsDateTimeFormat(event.endDate)}</div>
                                </>
                            )
                        )}
                        <Row>
                            <Button className='participate-event-btn' variant='success'>Participate Now</Button>
                        </Row>
                    </div>
                </div>
            ))}
            </div> ) : (
                <div className='no-results'>No results found! Try searching with other terms</div>
            )

        }
    </div>
  )
}

export default AllHackathonEvents