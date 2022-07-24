import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { GrAddCircle } from 'react-icons/gr';
import Course from './Course'
import './courses.css'
import AddCourse from './AddCourse';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Courses() {

  const navigate = useNavigate()

  const [subjects, setSubjects] = useState([]);
  const [vis,setVis]=useState(false)
  
  const addCourse = ()=>{
    setVis(!vis)
  }

  let token;

  if (localStorage.getItem('logs-token') === null) {
      navigate('/Login');
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

  const fetchSubjects = () => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects/list/`, options)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json().then(text => {throw text})
        }
    }).then(data => {
        console.log(data)
        setSubjects(data)
    }).catch(err => {
        console.log(err)
        if (err.detail) {
          alert('Please login again....');
          navigate('/Login');
        } else if (err.Message) {
          alert(err.Message);
          navigate('/Login');
        } else {
          alert('Something occured, please refresh the page...');
        }
    })
  }

  useEffect(() => {
    fetchSubjects();
  }, []) 

  return (
    <div className='courseMain' >
        <div className="coursesHead" >
            <HiOutlineDesktopComputer/>
            <p>COURSES</p>
            <button className='btn' onClick={addCourse}>
              <GrAddCircle/>
            </button>
        </div>
        <div className="coursesList">
          {subjects.map(subject => (
            <Course key={subject.id} subject={subject}/>
          ))}
        </div>

        {vis && <AddCourse/>}

        {/* Navigate to be loaded here Once the Button in Header is clicked */}

    </div>
  )
}

export default Courses