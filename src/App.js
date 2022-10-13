import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateHackathon from './components/Create Hackathon/CreateHackathon';
import HackathonEventOverview from './components/Hackathon Events/HackathonEventOverview';
import EditHackathon from './components/Edit Hackathon/EditHackathon';
import NavBar from './components/NavBar Component/NavBar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/create-hackathon' element={<CreateHackathon />}/>
        <Route path='/:id' element={<HackathonEventOverview />}/>
        <Route path='/edit-hackathon/:id' element={<EditHackathon />}/>
      </Routes>
    </div>
  );
}

export default App;
