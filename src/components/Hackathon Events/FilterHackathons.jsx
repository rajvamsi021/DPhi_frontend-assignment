import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Image } from 'react-bootstrap';
import { hackathonEventsList } from '../../utils/hackathonEvents';
import AllHackathonEvents from './AllHackathonEvents';
import DownArrowIcon from '../../assets/icons/down-arrow.svg';

const FilterHackathons = () => {

    const [searchName, setSearchName] = useState('');
    const [hackathons, setHackathons] = useState(hackathonEventsList);
    const [hackathonsFilteredByStatus, setHackathonsFilteredByStatus] = useState(hackathonEventsList);
    const [allChecked, setAllChecked] = useState(false);
    const [activeChecked, setActiveChecked] = useState(false);
    const [upcomingChecked, setUpcomingChecked] = useState(false);
    const [pastChecked, setPastChecked] = useState(false);
    const [easyChecked, setEasyChecked] = useState(false);
    const [mediumChecked, setMediumChecked] = useState(false);
    const [hardChecked, setHardChecked] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const searchNameHandler = (e) => {
        setSearchName(e.target.value);
    }

    useEffect(() => {
        if(allChecked) {
            setActiveChecked(true);
            setUpcomingChecked(true);
            setPastChecked(true);
        }
        else {
            setActiveChecked(false);
            setUpcomingChecked(false);
            setPastChecked(false);
        }

    }, [allChecked])

    // Filtering all the hackathons by hackathon name
    useEffect(() => {
        const filteredEvents = hackathonEventsList.filter((hackathonEvent) => {
            return hackathonEvent.eventName.toLowerCase().includes(searchName.toLowerCase());
        })

        setHackathons(filteredEvents);
    }, [searchName])


    // Filtering all the hackathons by hackathon status (active, upcoming, past)
    useEffect(() => {
        if(!activeChecked && !upcomingChecked && !pastChecked) {
            setHackathonsFilteredByStatus(hackathonEventsList);
        }
        else {

            let filteredResults = [];

            const activeFilteredEvents = hackathonEventsList.filter((hackathonEvent) => {
                if(activeChecked) {
                    return new Date(hackathonEvent.startDate).getTime() < new Date().getTime() && new Date(hackathonEvent.endDate).getTime() > new Date().getTime()
                }
                return;
            });

            if(activeFilteredEvents.length) {
                filteredResults = [...filteredResults, ...activeFilteredEvents];
            }

            const upcomingFilteredEvents = hackathonEventsList.filter((hackathonEvent) => {
                if(upcomingChecked) {
                    return new Date(hackathonEvent.startDate).getTime() > new Date().getTime() && new Date(hackathonEvent.endDate).getTime() > new Date().getTime()
                }
                return;
            });

            if(upcomingFilteredEvents.length) {
                filteredResults = [...filteredResults, ...upcomingFilteredEvents];
            }

            const pastFilteredEvents = hackathonEventsList.filter((hackathonEvent) => {
                if(pastChecked) {
                    return new Date(hackathonEvent.startDate).getTime() < new Date().getTime() && new Date(hackathonEvent.endDate).getTime() < new Date().getTime()
                }
                return;
            });

            if(pastFilteredEvents.length) {
                filteredResults = [...filteredResults, ...pastFilteredEvents];
            }

            //console.log(filteredResults)

            //setHackathons(filteredResults);
            setHackathonsFilteredByStatus(filteredResults);
            //console.log(filteredResults);
        }

    }, [activeChecked, upcomingChecked, pastChecked]);


    // Filtering all the hackathons by hackathon level (easy, medium, hard)
    useEffect(() => {
        if(!easyChecked && !mediumChecked && !hardChecked) {
            setHackathons(hackathonsFilteredByStatus);
        }
        else {
            let levelFilteredResults = [];

            const easyFilteredEvents = hackathonsFilteredByStatus.filter((hackathonEvent) => {
                if(easyChecked) {
                    return hackathonEvent.eventLevel.toLowerCase().includes('easy');
                }
                return;
            });

            if(easyFilteredEvents.length) {
                levelFilteredResults = [...levelFilteredResults, ...easyFilteredEvents];
            }

            const mediumFilteredEvents = hackathonsFilteredByStatus.filter((hackathonEvent) => {
                if(mediumChecked) {
                    return hackathonEvent.eventLevel.toLowerCase().includes('medium');
                }
                return;
            });

            if(mediumFilteredEvents.length) {
                levelFilteredResults = [...levelFilteredResults, ...mediumFilteredEvents];
            }

            const hardFilteredEvents = hackathonsFilteredByStatus.filter((hackathonEvent) => {
                if(hardChecked) {
                    return hackathonEvent.eventLevel.toLowerCase().includes('hard');
                }
                return;
            });

            if(hardFilteredEvents.length) {
                levelFilteredResults = [...levelFilteredResults, ...hardFilteredEvents];
            }

            setHackathons(levelFilteredResults);
        }

    }, [easyChecked, mediumChecked, hardChecked, hackathonsFilteredByStatus])

  return (
    <>
    <div className='filter-container'>
        <div className='text-center filter-container-title'>Explore Challenges</div>
        <Form onSubmit={(e) => {e.preventDefault()}}>
            <Row className='search-filter mt-5'>
                <Col md={8}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Search' value={searchName} onChange={searchNameHandler} size='lg' />
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <div onClick={() => {setOpenDropdown(!openDropdown)}} className={openDropdown ? 'filter-btn-open' : 'filter-btn'}>
                        Filter <Image src={DownArrowIcon} className={openDropdown ? 'up-arrow' : 'down-arrow'} alt='down-arrow'/>
                    </div>
                    {openDropdown && (
                        <div className='dropdown-container'>
                            <div className='dropdown-divider'></div>

                            <div className='mt-3'>Status</div>
                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setAllChecked(!allChecked)} checked={allChecked} label='All'/>
                            </div>

                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setActiveChecked(!activeChecked)} checked={activeChecked} label='Active'/>
                            </div>

                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setUpcomingChecked(!upcomingChecked)} checked={upcomingChecked} label='Upcoming'/>
                            </div>

                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setPastChecked(!pastChecked)} checked={pastChecked} label='Past'/>
                            </div>

                            <div className='dropdown-divider mt-3'></div>

                            <div className='mt-3'>Level</div>
                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setEasyChecked(!easyChecked)} checked={easyChecked} label='Easy'/>
                            </div>

                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setMediumChecked(!mediumChecked)} checked={mediumChecked} label='Medium'/>
                            </div>

                            <div className='filter-checkboxes'>
                                <Form.Check type='checkbox' onChange={() => setHardChecked(!hardChecked)} checked={hardChecked} label='Hard'/>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Form>
    </div>

    <AllHackathonEvents hackathons={hackathons}/>

    </>
  )
}

export default FilterHackathons