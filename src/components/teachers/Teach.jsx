import React from 'react'
import Courses from './Courses'
import Header from './Header'
import Navigate from './Navigate'
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';


function Teach() {
  
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(null);

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
  
  const fetchDetails = () => {
      fetch(`${process.env.REACT_APP_API_URL}/users/faculty/detail/`, options)
      .then(response => {
          if (response.ok) {
              return response.json()
          } else {
              return response.json().then(text => {throw text})
          }
      }).then(data => {
          setUserdata(data)
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
      fetchDetails();
  }, []) 


  return (
    <div>
        { userdata && <Header userdata={userdata}/> }
        <div className='body'>
        { userdata && <Courses/> }

        {/* Navigate Component is shown only when Nav button in header is trigd
        <Navigate/> 
        */}
        </div>

    </div>
  )
}

export default Teach