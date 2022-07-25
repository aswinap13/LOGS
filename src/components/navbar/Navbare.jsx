import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbare.css';
import Login from '../login/Login';
import Reg from './Reg';


function Navbare() {
  const [loginVisible, setloginVisible] = useState(false);
  const LoginShow = event => {
    setloginVisible(current => !current);
  };

  const [regVisible,setregVisible] = useState(false);
  const RegShow =()=>{
    setregVisible(!regVisible)
  }
  return (
    <div >
      <Navbar bg="light" expand="lg">
      <Container className='navbar'>
        <Navbar.Brand>LOGS</Navbar.Brand>
        <Nav className="me-auto nav-link">
            <Nav.Link className='navbar-item btn active' variant='danger'>Home</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='success' onClick={RegShow}>Register</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='danger'>Downloads</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='danger'>Demo</Nav.Link>
            <Nav.Link className='navbar-item btn' variant='light' onClick={LoginShow} >LogIn</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
       {loginVisible && (
        <Login setloginVisible={setloginVisible} LoginShow={LoginShow}/>
      )}
      {regVisible && (
        <Reg setregVisible={setregVisible} RegShow={RegShow}/>
      )}
    </div>
  )
}

export default Navbare