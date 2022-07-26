import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrAddCircle } from 'react-icons/gr';
import { Form } from 'react-bootstrap';
import './studc.css'


function Assessment({ subjectid, assessments, los }) {
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
            {assessc && <AssessComp subjectid={subjectid} los={los}/>}
            {/* Add mapping of all assessments */}
    </div>
  )
}

function AssessComp({ subjectid, los }){


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{'id': 0, 'question': '', 'learningoutcomes': [{'id': los[0].id, 'name': los[0].name}]}]);

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
        console.log(e.target.getAttribute('data-id'))
        let newquestions = [...questions]
        newquestions[id].learningoutcomes = [] 
    }

    return(
        <div className='addassess'>
            <p>
                Add Assessment
            </p>

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
                    <button>Add</button>
                    <button>Suggest</button>
                  </div>
                ))}
                <button className='btn addNQ' onClick={addQues}>
                <GrAddCircle/>
                </button>
             <button className='btn' type='submit'>Add Test</button>
            </Form>
        </div>
    )
}

export default Assessment