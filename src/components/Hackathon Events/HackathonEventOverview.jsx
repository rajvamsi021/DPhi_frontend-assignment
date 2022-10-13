import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import { hackathonEventsList } from '../../utils/hackathonEvents';
import ClockIcon from '../../assets/icons/clock-icon.svg';
import EventLevelIcon from '../../assets/icons/carbon_skill-level-basic.svg'
import { eventsDateTimeFormat, status } from '../../utils/statusCalculator';

const HackathonEventOverview = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const event = hackathonEventsList.filter((eventDetails) => {
        return id === eventDetails.id
    });

    const eventEditHandler = () => {
        navigate(`/edit-hackathon/${id}`);
    }

    const eventDeleteHandler = () => {
        const index = hackathonEventsList.findIndex(eventObject => {
            return eventObject.id === id;
        });

        hackathonEventsList.splice(index, 1);
        navigate('/');
        toast.success('Event deleted successfully', {autoClose: 3000});
    }

  return (
    <>
    <ToastContainer />
    <div>
        <div className='event-details'>
           <div className='event-start-time'>
                <span>
                    <img src={ClockIcon} style={{ width: 24, height: 24}}/>
                </span>
                <span className='ms-2'>
                   {status(event[0].startDate, event[0].endDate) === 'Upcoming' ? (
                        <>Starts On {eventsDateTimeFormat(event[0].startDate)} (India Standard Time)</>
                   ) : (
                    status(event[0].startDate, event[0].endDate) === 'Active' ? (
                        <>Ends On {eventsDateTimeFormat(event[0].endDate)} (India Standard Time)</>
                    ) : (
                        <>Ended On {eventsDateTimeFormat(event[0].endDate)} (India Standard Time)</>
                    )
                   )}
                </span>
            </div>

            <div className='event-details-title my-4'>{event[0].eventName}</div>

            <div className='event-details-description mb-4'>{event[0].eventDescription}</div>

            <div className='event-details-level'>
                <span>
                    <img src={EventLevelIcon} style={{ width: 20, height: 20}}/>
                </span>
                <span className='ms-2 events-level'>
                    {event[0].eventLevel}
                </span>
            </div>
        </div>

        <div className='event-details-tab'>
            <div className='event-overview'>Overview</div>

            <div className='display-left'>
                <Button onClick={eventEditHandler} className='edit-event-btn' variant='success'>Edit</Button>
                <Button onClick={eventDeleteHandler} className='delete-event-btn' variant='danger'>Delete</Button>
            </div>
        </div>

        <div className='event-overview-details'>
            <p>Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.</p>

            <p>An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.</p>

            <p>Your Task is to build an image Classification Model using CNN that classifies to which class of weather each Image belongs to.</p>

        </div>
    </div>
    </>
  )
}

export default HackathonEventOverview