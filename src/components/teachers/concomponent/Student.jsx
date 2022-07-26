import React, { useState } from 'react'
import './studc.css'
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

function Student({ subjectid, students, updated, setUpdated }) {
  
  const [studvis, setStudvis] = useState(false);
  const [admnum, setAdmnum] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  let token;
  if (localStorage.getItem('logs-token') === null) {
      navigate('/login');
  } else {
      token = localStorage.getItem('logs-token');
  }

  const showStud = () => {
    setStudvis(!studvis);
  }

  const handleStudadd = (e) => {
    e.preventDefault();

    const data = {admission_number: admnum};
    const options = { 
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(data)
    }

    fetch(`${process.env.REACT_APP_API_URL}/subjects/${subjectid}/students/add/`, options)
    .then(response => {
    if (response.ok) {
        return response.json()
    } else {
        return response.json().then(text => {throw text})
    }
    }).then(data => {
        setError(null)
        setUpdated(!updated)
        setStudvis(false);
        alert('Student added !!')
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

  return (
    <div>     
        <header className='studHead'>
            <p>Add Student</p>
            <button className='btn' onClick={showStud}>
            <GrAddCircle/>
            </button>
        </header>
        { studvis && 
            <div className='studForm'>
                { error && <p className='error'>{ error }</p> }
                <label>Admission Number:</label>
                <input type="number" value={admnum} onChange={(e) => setAdmnum(e.target.value)}></input>
                <button onClick={handleStudadd}>Add</button>
            </div>
        }
        <div>
            { students.map(student => (    
                <StudentInd key={student.id} student={student}/>
            )) }
        </div>
    </div>
  )
}

function StudentInd({ student }) {

    const navigate = useNavigate()

    const handleProfview = (e) => {
        e.preventDefault();
        navigate(`/student/${student.id}`)
    }

    return(
        <div className="stdIndComp">
            <p>{student.first_name} {student.last_name}</p>
            <p>Admission Number: {student.admission_number}</p>
            <p>Email: {student.email}</p>
            <button onClick={handleProfview}>View Profile</button>
        </div>
    )
}

export default Student