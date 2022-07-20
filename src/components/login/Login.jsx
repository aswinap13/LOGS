import React from 'react'
import { Button,Card } from 'react-bootstrap';
import './login.css';

function Login() {
  return (
        <div className='container'>
            <form className='login'>          
              <button type='button' className='closer'>
                <span aria-hidden="true">&times;</span>
              </button>
                
                <label htmlFor="userID">User ID</label>
                <input type="text"  ></input>
                <label htmlFor="userID">Password</label>
                <input type="password" ></input>
                <button type='submit' >Submit</button>          
            </form>
        </div>
  )
}

export default Login