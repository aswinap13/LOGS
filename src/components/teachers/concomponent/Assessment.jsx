import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrAddCircle } from 'react-icons/gr';
import { Form } from 'react-bootstrap';
import './studc.css'
import { useNavigate } from 'react-router-dom';


function Assessment({ subjectid, assessments, los, updated, setUpdated }) {
    const [assessc,setAssessc] = useState(false)
    const addAssess=()=>{
        if (los.length < 1) {
            alert('Course has no learning outcomes !!')
        } else {
            setAssessc(!assessc)
        }
    }
  return (
    <div>
            <header className='assesshead'>
                <p>Assessments</p>
                <button className='btn' onClick={addAssess}>
                <GrAddCircle/>
                </button>
            </header>
            {assessc && <AssessComp 
                            setAssessc={setAssessc}
                            subjectid={subjectid}
                            los={los}
                            updated={updated}
                            setUpdated={setUpdated}
                        />}
            <div>
                {assessments.map(ass => (
                    <div className='assesslist' key={ass.id}>
                        <h4>{ass.title}</h4>
                        <p>{ass.description}</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

function AssessComp({ setAssessc, subjectid, los, updated, setUpdated }){

    const navigate = useNavigate();

    let token;
    if (localStorage.getItem('logs-token') === null) {
        navigate('/login');
    } else {
        token = localStorage.getItem('logs-token');
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{'id': 0, 'question': '', 'learningoutcomes': [{'id': los[0].id, 'name': los[0].name}]}]);
    const [error, setError] = useState(null);

    const setQues = (value, id) => {
        let newquestions = [...questions]
        newquestions[id].question = value 
        setQuestions(newquestions)
    }

    const addQues = (e) => {
        e.preventDefault();
        setQuestions([...questions, {'id': questions.length, 'question': '', 'learningoutcomes': [{'id': los[0].id, 'name': los[0].name}]}])
    }

    const addLO = (e, id) => {
        e.preventDefault();
        let lo = los.find(l => l.name === e.target.value)
        if (lo === null) {
            lo = los[0]
        } else {
            delete lo.created_on
        }
        let newquestions = [...questions]
        newquestions[id].learningoutcomes = [lo]
        setQuestions(newquestions) 
    }

    const suggestLO = (e, id) => {
        e.preventDefault();
        const question = questions[id].question
        
        const data = {question}
        const options = { 
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(`http://localhost:8000/subjects/${subjectid}/lo/suggest/`, options)
        .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response.json().then(text => {throw text})
        }
        }).then(data => {
            setError(null)
            let lo = los.find(l => l.name === data.Data.name)
            if (lo === null) {
                lo = los[0]
            } else {
                delete lo.created_on
            }
            let newquestions = [...questions]
            newquestions[id].learningoutcomes = [lo]
            setQuestions(newquestions) 
        }).catch(err => {
            console.log(err)
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

    const addAssess = (e) => {
        e.preventDefault();

        // deleting 'name' key as we only want id for los
        let newquestions = [...questions]
        newquestions.forEach(que => {
            que.learningoutcomes = [que.learningoutcomes[0].id]
        })

        const data = {title, description, questions: newquestions};

        const options = { 
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(data)
        }

        fetch(`${process.env.REACT_APP_API_URL}/subjects/${subjectid}/assessment/create/`, options)
        .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response.json().then(text => {throw text})
        }
        }).then(data => {
            setError(null)
            setAssessc(false)
            setUpdated(!updated)
            alert('New assessment created !!')
        }).catch(err => {
            if (err.detail) {
                setAssessc(false)
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
        <div className='addassess'>
            { error && <p className='error'>{ error }</p> }
            <Form>
                <label>Title</label>
                <input value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
                <label>Description</label>
                <textarea value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                {questions.map(que => (    
                  <div className='addqustn' key={que.id}>                 
                    <label>Question {que.id + 1}: </label>
                    <input name="question" type="text" value={que.question} onChange={(e) => setQues(e.target.value, que.id)}></input>
                    <label>Learning Outcomes</label>
                    <select value={que.learningoutcomes[0].name} onChange={(e) => addLO(e, que.id)}>
                        {los.map(lo => (
                            <option key={lo.id} value={lo.name}>{lo.name}</option>
                        ))}
                    </select>
                    <button onClick={(e) => suggestLO(e, que.id)}>Suggest</button>
                  </div>
                ))}
                <button className='btn addNQ' onClick={addQues}>
                <GrAddCircle/>
                </button>
             <button className='btn' type='submit' onClick={addAssess}>Add Assessment</button>
            </Form>
        </div>
    )
}

export default Assessment