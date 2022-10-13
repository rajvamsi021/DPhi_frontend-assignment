import React from 'react'
import { Navbar, Container, Image } from 'react-bootstrap';
import Logo from '../../assets/icons/organization_logo.svg';
//import Icon from '../../assets/icons/organization_logo.svg';

const NavBar = () => {
  return (
    <>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand><Image src={Logo} alt='DPhi' style={{ width: 100, height: 50}}/></Navbar.Brand>
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar