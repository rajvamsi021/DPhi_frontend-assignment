import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {toast} from 'react-toastify'
import { Form, Button, Image, ToastContainer } from 'react-bootstrap';
import { hackathonEventsList } from '../../utils/hackathonEvents';
import UploadIcon from '../../assets/icons/bxs_cloud-upload.svg';
import ImageHolderIcon from '../../assets/icons/bi_image-fill.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';

const CreateHackathon = () => {
    const navigate = useNavigate();
    const hiddenFileInput = useRef(null);

    const [challengeName, setChallengeName] = useState('');
    const [challengeStartDate, setChallengeStartDate] = useState('');
    const [challengeEndDate, setChallengeEndDate] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [challengeLevel, setChallengeLevel] = useState('Easy');

    const uploadImageButtonClickHandler = () => {
        hiddenFileInput.current.click();
    }

    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    const createChallengeHandler = (e) => {
        e.preventDefault();

        if (!challengeName || !challengeStartDate || !challengeEndDate || !challengeDescription || !selectedFile || !challengeLevel) {
            toast.error('Please fill in all the fields', {autoClose: 3000});
        }
        else {
            const unique_id = uuid();

            hackathonEventsList.push({
                id: unique_id,
                eventName: challengeName,
                startDate: challengeStartDate,
                endDate: challengeEndDate,
                eventDescription: challengeDescription,
                eventImage: selectedFile,
                eventLevel: challengeLevel
            });

            toast.success('Event created successfully', {autoClose: 3000});
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

        <Form.Group className='mb-4 image-upload-container'>
            <Form.Label>Image</Form.Label>
            {selectedFile ? (
                <div className='change-image-container'>
                    <div className='uploaded-image-container'>
                        <Image src={selectedFile} alt={challengeName} className='uploaded-image'/>
                    </div>
                    <div className='change-image text-success' onClick={uploadImageButtonClickHandler}>
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
            ) : (
                <Button
                    type='button'
                    variant='none'
                    className='image-upload-btn'
                    onClick={uploadImageButtonClickHandler}
                >
                    Upload <Image src={UploadIcon} style={{ height: '24px', width: '24px' }} className='ms-2'/>
                </Button>
            )}
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

        <Button type='button' onClick={createChallengeHandler} variant='success'>Create Challenge</Button>

    </Form>
    </>
  )
}

export default CreateHackathon