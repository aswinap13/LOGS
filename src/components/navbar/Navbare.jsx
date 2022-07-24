import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbare.css';
import Login from '../login/Login';


function Navbare() {
  const [loginVisible, setloginVisible] = useState(false);
  const LoginShow = event => {
    setloginVisible(current => !current);
  };
  return (
    <div >
      <Navbar bg="light" expand="lg">
      <Container className='navbar'>
        <Navbar.Brand>LOGS</Navbar.Brand>
        <Nav className="me-auto nav-link">
            <Nav.Link className='navbar-item btn active' variant='danger'>Home</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='danger'>Documentation</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='danger'>Downloads</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='danger'>Demo</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='light' onClick={LoginShow} >LogIn</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
       {loginVisible && (
        <Login setloginVisible={setloginVisible} LoginShow={LoginShow}/>
      )}
    </div>
  )
}

export default Navbare