import React, { useEffect, useState } from 'react'
import './course.css'
import Assessment from './concomponent/Assessment';
import Student from './concomponent/Student';
import Feedback from './concomponent/Feedback';
import { useNavigate } from 'react-router-dom';

function Course({ subject }) {

  return (
    <div className='courseComp'>
        <h3>{ subject.name }</h3>
        <IndCourse subject={subject}/>       
    </div>
  )
}

// Upon Expansion Display Course details


function IndCourse({ subject }){
  const [courseOpen,setCourseOpen] = useState(false);
  return (
    <div className='indCourse'>
      <p>{ subject.description }</p>
        <footer>
          <button className='btn' onClick={()=>{
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            setCourseOpen(!courseOpen)
          }}>Expand</button> 
        </footer>
        
        {courseOpen && (
          <CourseIn setCourseOpen={setCourseOpen} courseOpen={courseOpen} subject={subject}/>
        )} 
    </div>
  )
}
function CourseIn(props){
  const courseOpen=props.courseOpen;
  const setCourseOpen=props.setCourseOpen;
  const subject=props.subject;

  const navigate = useNavigate();

  const [studv,setStudv] = useState(false)
  const [assesv,setAssesv] = useState(false)
  const [feedv,setFeedv] = useState(false)
  const [subdata, setSubdata] = useState(null)


  const togglestd =()=>{
    setStudv(!studv)
    if(assesv){
      setAssesv(!assesv)
    }
    if(feedv){
      setFeedv(!feedv)
    }
  }
  const toggleass = ()=>{
    setAssesv(!assesv)
    if(studv){
      setStudv(!studv)
    }
    if(feedv){
      setFeedv(!feedv)
    }
  }
  const togglefee =() =>{
    setFeedv(!feedv)
    if(assesv){
      setAssesv(!assesv)
    }
    if(studv){
      setStudv(!studv)
    }
  }

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

  const fetchSubject = () => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects/detail/${subject.id}/`, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return response.json().then(text => {throw text})
      }
    }).then(data => {
      setSubdata(data)
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

  useEffect(() => {
    if (courseOpen === true) {
      fetchSubject();
    }
  }, [courseOpen])

  return(
    <div className="CourseDetails">
      {subdata && <header>{subdata.name}</header>}
      <div className="courseContent">
        <div className="selectButton">
          <button >Home
          </button>
          <button onClick={togglestd}>Students
          </button>
          <button onClick={toggleass}>Assessments
          </button>
          <button onClick={togglefee}>FeedBack
          </button>
        </div>
        { subdata &&
          <div className="selecti">
            { <div className="courseHome">{subdata.description}</div>}
            {studv &&
              <div className="courseStudent"><Student students={subdata.students}/></div>
            }
            {
              assesv && <div className="courseAssess">
                          <Assessment 
                            subjectid={subject.id}
                            assessments={subdata.assessments} 
                            los={subdata.learning_outcomes}
                          />
                        </div>
            }
            
            {
              feedv && <div className="courseFeedBack"><Feedback subjectid={subject.id} feedv={feedv}/></div>
            }
          </div>
        }
      </div>

      <button type='button' className='closerco' onClick={() => {setCourseOpen(!courseOpen)}}>
                <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Course