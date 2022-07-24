import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { GrAddCircle } from 'react-icons/gr';
import Course from './Course'
import './courses.css'
import AddCourse from './AddCourse';

function Courses() {
  const [vis,setVis]=useState(false)
  const addCourse = ()=>{
    setVis(!vis)
  }
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
          {/* Loop course.jsx */}
          <Course/>
        </div>

        {vis && <AddCourse/>}

        {/* Navigate to be loaded here Once the Button in Header is clicked */}

    </div>
  )
}

export default Courses