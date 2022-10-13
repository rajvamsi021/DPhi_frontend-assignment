import React, {useState, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import {toast, ToastContainer} from 'react-toastify';
import { hackathonEventsList } from '../../utils/hackathonEvents';
import ImageHolderIcon from '../../assets/icons/bi_image-fill.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';

const EditHackathon = () => {
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);
    const params = useParams();
    const id = params.id;

    const event = hackathonEventsList.filter((eventDetails) => {
        return id === eventDetails.id
    });

    const index = hackathonEventsList.findIndex((eventObject) => {
        return eventObject.id === id;
    });

    const [challengeName, setChallengeName] = useState(event[0].eventName);
    const [challengeStartDate, setChallengeStartDate] = useState(event[0].startDate);
    const [challengeEndDate, setChallengeEndDate] = useState(event[0].endDate);
    const [challengeDescription, setChallengeDescription] = useState(event[0].eventDescription);
    const [selectedFile, setSelectedFile] = useState(event[0].eventImage);
    const [challengeLevel, setChallengeLevel] = useState(event[0].eventLevel);

    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    const changeImageButtonClickHandler = () => {
        hiddenFileInput.current.click();
    }

    const editChallengeHandler = (e) => {
        e.preventDefault();
        if(!challengeName || !challengeStartDate || !challengeEndDate || !challengeDescription || !selectedFile || !challengeLevel) {
            toast.error('Please fill in all the fields', {autoClose: 3000});
        }
        else {
            hackathonEventsList[index] = {
                id: id,
                eventName: challengeName,
                startDate: challengeStartDate,
                endDate: challengeEndDate,
                eventDescription: challengeDescription,
                eventImage: selectedFile,
                eventLevel: challengeLevel
            }
            toast.success('Event Updated successfully', {autoClose: 3000});
            navigate('/')
        }
    }

  return (
    <>
    <ToastContainer />
    <div className='challenge-details'>Challenge Details</div>
    <Form className='event-form-container' onSubmit={(e) => {e.preventDefault()}}>
        <Form.Group className='mb-4'>
            <Form.Label>Challenge Name</Form.Label>
            <Form.Control
                type='text'
                value={challengeName}
                onChange={(e) => {setChallengeName(e.target.value)}}
                className='form-inputs-width'
            />
        </Form.Group>

        <Form.Group className='mb-4'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
                type='datetime-local'
                value={challengeStartDate}
                onChange={(e) => {setChallengeStartDate(e.target.value)}}
                className='form-inputs-width'
            />
        </Form.Group>

        <Form.Group className='mb-4'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
                type='datetime-local'
                value={challengeEndDate}
                onChange={(e) => {setChallengeEndDate(e.target.value)}}
                className='form-inputs-width'
            />
        </Form.Group>

        <Form.Group className='mb-4'>
            <Form.Label>Description</Form.Label>
            <Form.Control
                value={challengeDescription}
                onChange={(e) => {setChallengeDescription(e.target.value)}}
                as='textarea'
                style={{ height: '200px', width: '60%' }}
            />
        </Form.Group>

        <Form.Group className='mb-4'>
            <Form.Label>Image</Form.Label>
            <div className='change-image-container'>
                <div className='uploaded-image-container'>
                    <Image src={selectedFile} alt={challengeName} className='uploaded-image'/>
                </div>
                <div className='change-image text-success' onClick={changeImageButtonClickHandler}>
                    <span>
                        <Image src={ImageHolderIcon} style={{ height: '20px', width: '20px' }} alt='img'/>
                    </span>
                    <span className='ms-2'>
                        Change Image
                    </span>
                    <span>
                        <Image src={RightArrowIcon} style={{ height: '20px', width: '15px' }} alt='img' className='ms-2'/>
                    </span>
                </div>
            </div>
            <input
                type='file'
                onChange={onImageChange}
                style={{display:'none'}}
                ref={hiddenFileInput}
            />
        </Form.Group>

        <Form.Group className='mb-5'>
            <Form.Label>Level Type</Form.Label>
            <Form.Select
                onChange={(e) => {setChallengeLevel(e.target.value)}}
                value={challengeLevel}
                className='form-inputs-width'
            >
                <option value='Easy'>Easy</option>
                <option value='Medium'>Medium</option>
                <option value='Hard'>Hard</option>
            </Form.Select>
        </Form.Group>

        <Button type='button' onClick={editChallengeHandler} variant='success'>Save Changes</Button>

    </Form>
    </>
  )

}

export default EditHackathon