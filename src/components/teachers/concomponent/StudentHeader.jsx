import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import Graph from '../../students/Graph/Graph'
import { useNavigate } from 'react-router-dom';
import '../../students/studHeader.css'

function StudentHeader({ userdata, studdata, updated, setUpdated }) {

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

        const sub = studdata.subjects.find(s => s.id === id)
        setCurrsub(sub)
    }

    const fetchImprove = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/subjects/${id}/lo/improve/${studdata.profile.admission_number}`, options)
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
                navigate('/Staff')
            } else {
                alert('Something occured, please refresh the page...');
            }
        })
    }

    useEffect(() => {
        if (studdata.subjects.length > 0) {
            if (currsub !== null) {
                let sub = studdata.subjects.find(x => x.id === currsub.id)
                setCurrsub(sub)
            } else {
                setCurrsub(studdata.subjects[0])
            }
        }
    }, [studdata])

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
                <h3>{studdata.first_name} {studdata.last_name}</h3>
                <p>Admission Number: {studdata.profile.admission_number}</p>
                <p>Email: {studdata.email}</p>
                <p>Details</p>
                <div className='subjects'>
                    { studdata.subjects.map(sub => (
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
                            adm_num={studdata.profile.admission_number} 
                            first_name={studdata.first_name}
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
                                    <AssessDetail 
                                        key={ass.id} 
                                        assess={ass}
                                        studdata={studdata}
                                        updated={updated}
                                        setUpdated={setUpdated}
                                    ></AssessDetail>
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

const AssessDetail = ({ assess, studdata, updated, setUpdated }) => {
    const [showres, setShowres] = useState(false)

    const toggleShowres = (e) => {
        e.preventDefault();
        setShowres(!showres);
    }

    return (
        <div className='assessDetail'>
            <p><strong>{assess.title}</strong></p>
            { assess.submitted_on ? <button onClick={toggleShowres}>Show Result</button> : <ResponseForm 
                                                                                assid={assess.id} 
                                                                                admnum={studdata.profile.admission_number}
                                                                                updated={updated}
                                                                                setUpdated={setUpdated}
                                                                                >Add response
                                                                            </ResponseForm>}
            { assess.submitted_on &&
              <ul>
                { showres && assess.response.map(r => (
                    <li key={r.id}>{r.question} | Mark = {r.mark}</li>
                ))}
              </ul>
            }
        </div>
    )
}

const ResponseForm = ({ assid, admnum, updated, setUpdated }) => {
    const [showres, setShowres] = useState(false);
    const [questions, setQuestions] = useState([]);

    const toggleShowres = (e) => {
        e.preventDefault();
        setShowres(!showres);
    }

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

    const fetchAssessment = () => {
        fetch(`${process.env.REACT_APP_API_URL}/subjects/assessment/detail/${assid}/`, options)
        .then(response => {
            if (response.ok) {
            return response.json()
            } else {
            return response.json().then(text => {throw text})
            }
        }).then(data => {
            data.questions.forEach(que => {
                que.mark = ''
            })
            setQuestions(data.questions)
        }).catch(err => {
            if (err.detail) {
                alert('Please login again....');
                navigate('/login');
            } else if (err.Message) {
                alert(err.Message);
                navigate('/Staff')
            } else {
                alert('Something occured, please refresh the page...');
            }
        })
    }

    useEffect(() => {
        if (showres) {
            fetchAssessment();
        }
    }, [showres])

    const changeMark = (e, id) => {
        let index = questions.findIndex(x => x.id === id)
        let newquestions = [...questions]
        newquestions[index].mark = e.target.value
        setQuestions(newquestions)
    }

    const addRes = (e) => {
        e.preventDefault();

        let newquestions = questions
        newquestions.forEach(que => {
            delete que.learningoutcomes
            que.question = que.id
            delete que.id
        })
        const data = {admission_number: admnum, questions: newquestions}

        const postoptions = { 
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${process.env.REACT_APP_API_URL}/subjects/assessment/submit/${assid}/`, postoptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(text => {throw text})
            }
        }).then(data => {
            setUpdated(!updated)
            alert('Response added !!')
        }).catch(err => {
            if (err.detail) {
                alert('Please login again....');
                navigate('/login');
            } else if (err.Message) {
                alert(err.Message);
            } else {
                alert('Something occured, please refresh the page...');
            }
        })
    }



    return (
        <div> 
            <button onClick={toggleShowres}>Add Response</button>
            { showres && 
                <div className='responseForm'>
                    { questions.map(que => (
                        <div key={que.id}>
                            <label>{que.question}</label>
                            <input type='number' value={que.mark} onChange={(e) => changeMark(e, que.id)}></input>
                        </div>
                    ))}
                    <button onClick={addRes}>Add</button>
                </div>}
        </div>
    )
}

export default StudentHeader