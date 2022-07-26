import React from 'react';
import './stud.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Student() {

  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(null);
  const [updated, setUpdated] = useState(false);

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
    fetch(`${process.env.REACT_APP_API_URL}/users/student/detail/`, options)
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
          navigate('/login');
        } else {
          alert('Something occured, please refresh the page...');
        }
    })
}

useEffect(() => {
    fetchDetails();
}, [updated]) 

return (
  <div className='student'>
    { userdata && <Header userdata={userdata} updated={updated} setUpdated={setUpdated}/> }
  </div>
)
}

export default Student