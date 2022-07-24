import React from 'react'
import { Button,Card } from 'react-bootstrap';
import './login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

  const setloginVisible=props.setloginVisible;
  const LoginShow=props.LoginShow;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {username, password};

    const options = { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/login/`, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return response.json().then(text => {throw text})
      }
    }).then(data => {
      setError(null)
      localStorage.setItem('logs-token', data.token);
      setToken(data.token)
      if (data.is_admin) {
        console.log('Admin')
      } else if (data.is_student) {
        navigate('/student')
      } else {
        navigate('/Staff', { state: data })
      }
    }).catch(err => {
      if (err.Message) { // when user account not approved yet, code: 401
        setError(err.Message)
      } else if (err.non_field_errors !== null) { // when invalid credentials, code: 400
        setError("Invalid username or password")
      } else { // when something else
        setError("Something occured..please try again later..")
      }
    })
  }

  useEffect(() => {
    localStorage.setItem('logs-token', token);
  }, [token])

  return (
        <div className='container'>
            <form className='login'>          
              <button type='button' className='closer' onClick={() => setloginVisible(!LoginShow)}>
                <span aria-hidden="true">&times;</span>
              </button>
                { error && <p className='error'>{ error }</p>}
                <label htmlFor="userID">User ID</label>
                <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
                <label htmlFor="userID">Password</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                <button type='submit' onClick={handleSubmit}>Submit</button>          
            </form>
        </div>
  )
}

export default Login