import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { Form } from 'react-bootstrap';

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
        <header className='assesshead'>
                <p>Feedbacks</p>
                <button className='btn'>
                <GrAddCircle/>
                </button>
        </header>
        <FeedbackForm/>

        {/* map feedback and give detail, on clicking each feedback, show the feedback responses */}
    </div>
  )
}


function FeedbackForm(){
  return(
    <div className="feedForm">
      <Form>
        <label>Title</label>
        <input ></input>
        <label>Description</label>
        <textarea ></textarea>
        <button className='btn mt-4'>Create</button>
      </Form>
    </div>
  )
}
export default Feedback