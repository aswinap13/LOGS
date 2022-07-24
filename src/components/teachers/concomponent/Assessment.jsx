import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrAddCircle } from 'react-icons/gr';
import './studc.css'


function Assessment() {
    const [assessc,setAssessc] = useState(false)
    const addAssess=()=>{
        setAssessc(!assessc)
    }
  return (
    <div>
            <header className='assesshead'>
                <p>Assessments</p>
                <button className='btn' onClick={addAssess}>
                <GrAddCircle/>
                </button>
            </header>
            {assessc && <AssessComp/>}
            
    </div>
  )
}

function AssessComp(){
    return(
        <div className='addassess'>
            <p>
                Add Assessment
            </p>

            <form>
                <label>Question 1 : </label>
                <input>
                </input>
                <label>Learning Outcomes</label>
                
            </form>
        </div>
    )
}

export default Assessment