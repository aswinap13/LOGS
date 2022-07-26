import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import StudentHeader from './StudentHeader';

function StudentDetail() {

  const { id } = useParams();

  const navigate = useNavigate();
  const [studdata, setStuddata] = useState(null);
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

  const fetchStudentdetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/student/detail/${id}/`, options)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response.json().then(text => {throw text})
        }
    }).then(data => {
        setStuddata(data)
    }).catch(err => {
        if (err.detail) {
          alert('Please login again....');
          navigate('/login');
        } else if (err.Message) {
          alert(err.Message);
          navigate('/Staff')
        } else {
          alert('Something occured, please refresh the page...');
        }
    })
  }

  const fetchUserdetails = () => {
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
        fetchStudentdetails();
    }, [updated]) 

    useEffect(() => {
        fetchUserdetails();
    }, [])

    return (
    <div className='student'>
        { userdata && studdata &&
            <StudentHeader 
                userdata={userdata}
                studdata={studdata}
                updated={updated} 
                setUpdated={setUpdated}
            />
        }
    </div>
    )
}

export default StudentDetail