import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { Form } from 'react-bootstrap';
import './studc.css'

function Feedback({ subjectid, feedv }) {

  const [feedcreate, setFeedcreate] = useState(false);
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
  }, [feedv, feedcreate])

  const showCreate = () => {
    setFeedcreate(!feedcreate)
  }


  return (
    <div>
        <header className='assesshead'>
                <p>Feedbacks</p>
                <button className='btn' onClick={showCreate}>
                <GrAddCircle/>
                </button>
        </header>
        { feedcreate && <FeedbackForm setFeedcreate={setFeedcreate} subjectid={subjectid}/>}
        <div>
          {feeds.map(feed => (
            <div className='assesslist' key={feed.id}>
                <h4>{feed.title}</h4>
            </div>
          ))}
        </div>
    </div>
  )
}


function FeedbackForm({ setFeedcreate, subjectid }){

  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let token;
  if (localStorage.getItem('logs-token') === null) {
      navigate('/login');
  } else {
      token = localStorage.getItem('logs-token');
  }

  const createFeed = (e) => {
    e.preventDefault();

    const data = {title, subject: subjectid};
    const options = { 
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(data)
    }

    fetch(`${process.env.REACT_APP_API_URL}/feedback/create/`, options)
    .then(response => {
    if (response.ok) {
        return response.json()
    } else {
        return response.json().then(text => {throw text})
    }
    }).then(data => {
        setError(null)
        setFeedcreate(false)
        alert('New feedback created !!')
    }).catch(err => {
        if (err.detail) {
            setFeedcreate(false)
            alert('Please login again....');
            navigate('/login');
        } else if (err.Message) {
            setError(err.Message);
        } else {
            setError('Please try again...');
        }
    })
  }

  return(
    <div className="feedForm">
      { error && <p className='error'>{ error }</p> }
      <Form>
        <label>Title</label>
        <input name='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <button className='btn mt-4' onClick={createFeed}>Create</button>
      </Form>
    </div>
  )
}
export default Feedback