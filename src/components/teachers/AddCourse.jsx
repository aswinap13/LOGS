import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import './addasses.css'
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';


function AddCourse({ setVis }) {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  let token;

  if (localStorage.getItem('logs-token') === null) {
      navigate('/login');
  } else {
      token = localStorage.getItem('logs-token');
  }

  const createCourse = (e) => {
    e.preventDefault();
    const data = {name, description};

    const options = { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      body: JSON.stringify(data)
    }

    fetch(`${process.env.REACT_APP_API_URL}/subjects/create/`, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return response.json().then(text => {throw text})
      }
    }).then(data => {
      setError(null)
      setVis(false)
      alert('New course created !!')
      navigate('/Staff');
    }).catch(err => {
        if (err.detail) {
            setVis(false);
            alert('Please login again....');
            navigate('/login');
        } else if (err.Message) {
            setError(err.Message);
        } else {
            setError('Please try creating course again...');
        }
    })
  }

  return (
    <div>
        <div className="addasses" >
            <header>
            <HiOutlineDesktopComputer/>
            <p>ADD COURSE</p>
            </header>
            <button type='button' className='closerco' onClick={() => {setVis(false)}}>
                <span aria-hidden="true">&times;</span>
            </button>
            <div className="addcForm">
                    <Form>
                        {error && <p className='error'>{ error }</p>}
                        <div className="name formitem">
                            <label>COURSE NAME</label>
                            <input value={name} onChange={(e) => {setName(e.target.value)}}></input>
                        </div>
                        <div className="desc formitem">
                            <label>DESCRIPTION</label>
                            <input value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
                        </div>
                        {/* <div className="lo formitem">
                            <label>ADD LO's</label>
                            <input>
                            </input>
                        </div> */}
                        <button className='btn' onClick={createCourse}>CREATE COURSE</button>
                    </Form>
            </div>
        </div>
        
    </div>
  )
}

export default AddCourse