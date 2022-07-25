import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Feedback({ subjectid, feedv }) {

  const [feeds, setFeeds] = useState([]);
  const navigate = useNavigate();

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

  const fetchFeeds = () => {
    fetch(`${process.env.REACT_APP_API_URL}/feedback/${subjectid}/view/all/`, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return response.json().then(text => {throw text})
      }
    }).then(data => {
      setFeeds(data)
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
    if (feedv) {
      fetchFeeds();
    }
  }, [feedv])


  return (
    <div className='feedbackstaff'>
        <p>
            Feedbacks
        </p>
        {/* map feedback and give detail, on clicking each feedback, show the feedback responses */}
    </div>
  )
}

export default Feedback