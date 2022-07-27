import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import './studHeader.css'
import { useState } from 'react';
import Graph from './Graph/Graph'
import { useNavigate } from 'react-router-dom';

function Header({ userdata, updated, setUpdated }) {

    const [currsub, setCurrsub] = useState(null);
    const [improvelo, setImprovelo] = useState([]);
    
    const navigate = useNavigate()

    let token;
    if (localStorage.getItem('logs-token') === null) {
        navigate('/login');
    } else {
        token = localStorage.getItem('logs-token');
    }

    const abortCont = new AbortController();

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `token ${token}`
        },
        signal:abortCont.signal
    }

    const subChange = (e, id) => {
        e.preventDefault();

        const sub = userdata.subjects.find(s => s.id === id)
        setCurrsub(sub)
    }

    const fetchImprove = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/subjects/${id}/lo/improve/${userdata.profile.admission_number}`, options)
        .then(response => {
            if (response.ok) {
            return response.json()
            } else {
            return response.json().then(text => {throw text})
            }
        }).then(data => {
            if (data.length > 1) {
                setImprovelo(data.slice(0, 2))
            } else {
                setImprovelo(data)
            }
        }).catch(err => {
            if (err.detail) {
                alert('Please login again....');
                navigate('/login');
            } else if (err.Message) {
                alert(err.Message);
                navigate('/login');
            } else {
                alert('Something occured, please refresh the page...');
            }
        })
    }

    useEffect(() => {
        if (userdata.subjects.length > 0) {
            if (currsub !== null) {
                let sub = userdata.subjects.find(x => x.id === currsub.id)
                setCurrsub(sub)
            } else {
                setCurrsub(userdata.subjects[0])
            }
        }
    }, [userdata])

    useEffect(() => {
        if (currsub !== null) {
            fetchImprove(currsub.id)
        }
    }, [currsub])

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
                    <Nav.Link className='navbar-item btn ' variant='danger'><h3>{userdata.first_name} {userdata.last_name}</h3></Nav.Link>
                    <Nav.Link className='navbar-item btn lastitem' variant='danger'>
                    <GiHamburgerMenu/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <div className="studBody">
            <div className="studProfile">
                <h3>{userdata.first_name} {userdata.last_name}</h3>
                <p>Admission Number: {userdata.profile.admission_number}</p>
                <p>Email: {userdata.email}</p>
                <p>Details</p>
                <div className='subjects'>
                    { userdata.subjects.map(sub => (
                        <button key={sub.id} onClick={(e) => subChange(e, sub.id)}>{sub.name}</button>
                    )) }
                </div>
            </div>
            <div className="studReview">
                {currsub &&
                    <div>
                        <h4>{ currsub.name }</h4> 
                        <p>{ currsub.description }</p>
                        <hr></hr>
                        <h5>Progress Graph:</h5>
                        <Graph 
                            adm_num={userdata.profile.admission_number} 
                            first_name={userdata.first_name}
                            currsub={currsub}
                        ></Graph>
                        <hr></hr>    
                        <div className="detailReview">
                            <h5>Areas to be improved:</h5>
                            <ul>      
                                {improvelo.map(lo => (
                                    <li key={lo.id}>{ lo.name }</li>
                                ))}
                            </ul>
                        </div>
                        <hr></hr>
                        <div className="assessments">
                            <h5>Assessments:</h5>
                            <div>    
                                { currsub.assessments.map(ass => (
                                    <div key={ass.id} className="assessDetail">
                                        <p><strong>{ass.title}</strong></p>
                                        { ass.submitted_on ? <p>Result:</p>: <p>Result pending...</p>}
                                        { ass.submitted_on && 
                                            <ul>
                                                { ass.response.map(r => (
                                                    <li key={r.id}>{r.question} | Mark = {r.mark}</li>
                                                ))}
                                            </ul>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr></hr>
                        <div className='feedbacks'>
                            <h5>Feedbacks:</h5>
                            <div>    
                                { currsub.feedbacks.filter(x => x.response === null).map(feed => (
                                    <StudentFeed 
                                        key={feed.id}
                                        feed={feed}
                                        updated={updated}
                                        setUpdated={setUpdated}
                                    ></StudentFeed>
                                ))}
                            </div>
                        </div>
                        <div className="canvas"></div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

const StudentFeed = ({ feed, updated, setUpdated }) => {
    const [showfeed, setShowfeed] = useState(false);

    const showFeed = (e)=> {
        e.preventDefault();
        setShowfeed(!showfeed)
    }

    return (
        <div className="feedDetail">        
            <p><strong>{feed.title}</strong></p>
            <button onClick={showFeed}>Add response</button>
            { showfeed && <FeedForm 
                            id={feed.id}
                            updated={updated} 
                            setUpdated={setUpdated}
                            ></FeedForm> }
        </div>
    )
}

const FeedForm = ({ id, updated, setUpdated }) => {
    const [res, setRes] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    let token;
    if (localStorage.getItem('logs-token') === null) {
        navigate('/login');
    } else {
        token = localStorage.getItem('logs-token');
    }

    const handleFeed = (e) => {
        e.preventDefault();

        const data = {response: res};
        const options = { 
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${process.env.REACT_APP_API_URL}/feedback/submit/${id}/`, options)
        .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response.json().then(text => {throw text})
        }
        }).then(data => {
            setError(null)
            setUpdated(!updated)
            alert('Feedback response added !!')
        }).catch(err => {
            if (err.detail) {
                alert('Please login again....');
                navigate('/login');
            } else if (err.Message) {
                setError(err.Message);
            } else {
                setError('Please try again...');
            }
        })
    }

    return(
        <div className="feedbackform">
            { error && <p>{ error }</p> }
            <textarea value={res} onChange={(e) => setRes(e.target.value)}></textarea>
            <button onClick={handleFeed}>Submit</button>
        </div>
    )
}
export default Header