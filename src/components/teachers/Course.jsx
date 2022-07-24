import React from 'react'
import './course.css'

function Course({ subject }) {

  return (
    <div className='courseComp'>
      <p>{subject.name}</p>
      <p>{subject.description}</p>
    </div>
  )
}

// Upon Expansion Display Course details


function IndCourse(){
  return (
    <div className='indCourse'>
      
    </div>
  )
}

export default Course