import React from 'react'
import './studc.css'
import { GrAddCircle } from 'react-icons/gr';

function Student({ students }) {
  return (
    <div>     
        <header className='studHead'>
            <p>Add Student</p>
            <button className='btn'>
            <GrAddCircle/>
            </button>
        </header>
        <div>
            { students.map(student => (    
                <StudentInd key={student.id} student={student}/>
            )) }
        </div>
    </div>
  )
}

function StudentInd({ student }){
    return(
        <div className="stdIndComp">
            <p>{student.first_name} {student.last_name}</p>
            <p>Admission Number: {student.admission_number}</p>
            <p>Email: {student.email}</p>
            {/* <div className="studstatus">
                <p>subject name</p>
                Learning outcome details and GRAPH 
            </div> */}
        </div>
    )
}

export default Student