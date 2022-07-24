import React, { useState } from 'react'
import './course.css'
import Assessment from './concomponent/Assessment';
import Student from './concomponent/Student';
import Feedback from './concomponent/Feedback';

function Course() {
  return (
    <div className='courseComp'>
        Map course and display using IndCourse comp below
        <IndCourse/>       

    </div>
  )
}

// Upon Expansion Display Course details


function IndCourse(){
  const [courseOpen,setCourseOpen] = useState(false);
  return (
    <div className='indCourse'>
      Course Brief Description
        <footer>
          <button className='btn' onClick={()=>{
            setCourseOpen(!courseOpen)
          }}>Expand</button> 
        </footer>
        
        {courseOpen && (
          <CourseIn setCourseOpen={setCourseOpen} courseOpen={courseOpen} />
        )} 
    </div>
  )
}
function CourseIn(props){
  const courseOpen=props.courseOpen;
  const setCourseOpen=props.setCourseOpen;

  const [studv,setStudv] = useState(false)
  const [assesv,setAssesv] = useState(false)
  const [feedv,setFeedv] = useState(false)


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

  return(
    <div className="CourseDetails">
      <header>CST 302 : Formal Languages</header>
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
        <div className="selecti">
          <div className="courseHome">Details regarding Course</div>
          {studv && 
            <div className="courseStudent"><Student/></div>
          }
          {
            assesv && <div className="courseAssess"><Assessment/></div>
          }
          
          {
            feedv && <div className="courseFeedBack"><Feedback/></div>
          }
        </div>
      </div>

      <button type='button' className='closerco' onClick={() => {setCourseOpen(!courseOpen)}}>
                <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Course