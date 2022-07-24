import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import './addasses.css'
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';


function AddCourse() {
  return (
    <div>
        <div className="addasses" >
            <header>
            <HiOutlineDesktopComputer/>
            <p>ADD COURSE</p>
            </header>
            <div className="addcForm">
                    <Form>
                        <div className="name formitem">
                            <label>COURSE NAME</label>
                            <input></input>
                        </div>
                        <div className="desc formitem">
                            <label>DESCRIPTION</label>
                            <input></input>
                        </div>
                        <div className="lo formitem">
                            <label>ADD LO's</label>
                            <input>
                            </input>
                        </div>
                        <button className='btn'>CREATE COURSE</button>
                    </Form>
            </div>
        </div>
        
    </div>
  )
}

export default AddCourse