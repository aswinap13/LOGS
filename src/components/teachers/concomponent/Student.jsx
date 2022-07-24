import React from 'react'
import './studc.css'

function Student() {
  return (
    <div className='studinCourse'>
        map Student
        STUDENT COMPONENT TO BE FORMED
        <StudentInd/>
    </div>
  )
}

function StudentInd(){
    return(
        <div className="stdIndComp">
            <p>Student Name</p>
            <div className="studstatus">
                <p>subject name</p>
                Learning outcome details and GRAPH 
            </div>
        </div>
    )
}

export default Student