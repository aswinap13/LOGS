import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import './studHeader.css'
import { useState } from 'react';

function Header() {
    const [feed,setfeed]=useState(false);
    const showFeed=()=>{
        setfeed(!feed)
    }
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
                    <Nav.Link className='navbar-item btn ' variant='danger'><h3>STud NAme</h3></Nav.Link>
                    <Nav.Link className='navbar-item btn lastitem' variant='danger'>
                    <GiHamburgerMenu/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <div className="studBody">
            {feed && <FeedForm setfeed={setfeed} feed={feed} />}
            <div className="studProfile">
                <h3>Name of TSuden</h3>
                <p>Details</p>
                <div className="assessments">
                    <button>test1</button>
                    <button>test2</button>
                </div>
                <div className="studfeedd">
                    LIST THE FEEDBACKS INITIATED BY TEACHER AND CLICK ON BUTTON
                    <button onClick={showFeed}>
                        Feedback
                    </button>
                </div>
            </div>
            <div className="studReview">
                <div className="detailReview">Has scrored 80% marsk kldnsvndxklvnmxdv</div>
                <div className="canvas"></div>
            </div>
        </div>
    </div>
  )
}
function FeedForm(props){
    const setFeed=props.setFeed;
    const feed=props.feed;
    const showFeed=()=>{
        setFeed(!feed)
    }
    return(
        <div className="feedbackform">        
        <button type='button' className='closerl' onClick={showFeed}>
          <span aria-hidden="true">&times;</span>
        </button>
            <h4>FeedBakc heading</h4>
            <h5>detialss</h5>
            <label>Enter your feedbacck</label>
            <input >
            </input>

        </div>
    )
}
export default Header