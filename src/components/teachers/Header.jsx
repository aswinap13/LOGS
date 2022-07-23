import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import StaffC from './StaffC';
import './header.css'


function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
      <Container className='navbar'>
        <Navbar.Brand>
          <>
          LOGS-CET
          </>
        </Navbar.Brand>
        <Nav className="me-auto nav-link">
            <Nav.Link className='navbar-item btn ' variant='danger'><StaffC/></Nav.Link>
            <Nav.Link className='navbar-item btn lastitem' variant='danger'>
              <GiHamburgerMenu/>
            </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header