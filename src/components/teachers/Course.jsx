import React, { useState } from 'react'
import './course.css'

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
  return(
    <div className="CourseDetails">
      <header>This is header containing course name</header>
      <div className="courseContent">
        <div className="selectButton">
          <button>Home</button>
          <button>Students</button>
          <button>Assessments</button>
          <button>FeedBack</button>
        </div>
        <div className="selecti">
          <div className="courseHome">This contains course Description</div>
          <div className="courseStudent">This is 1/3 of coursecomponent and display student component</div>
          <div className="courseAssess">This is 1/3 of coursecomponent and display assessment</div>
          <div className="courseFeedBack">This is 1/3 of coursecomponent and display feedback</div>
        </div>
      </div>

      <button type='button' className='closer' onClick={() => {setCourseOpen(!courseOpen)}}>
                <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Course