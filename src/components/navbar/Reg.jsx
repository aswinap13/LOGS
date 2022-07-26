import React, { useState } from 'react'
import './reg.css'


function Reg(props) {
    const regVisible=props.regVisible;
    const RegShow=props.RegShow;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleReg = (e) => {
      e.preventDefault();
      const faculty = {dob:'2001-02-03', address:'none', phonenumber:phonenumber, position:'none'}
      const data = {first_name:firstname, last_name:lastname, username, password, email, faculty};
  
      const options = { 
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
  
      fetch(`${process.env.REACT_APP_API_URL}/users/faculty/register/`, options)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json().then(text => {throw text})
        }
      }).then(data => {
        setError(null)
        RegShow();
        alert('Faculty successfully registered. Please wait for approval !')
      }).catch(err => {
        if (err.Message) {
          setError(err.Message)
        }  else { 
          setError("Something occured..please try again later..")
        }
      })
    }

  return (
    <div>
        
        <form className='reg'> 
        <p><b>Register as a Faculty</b></p>         
              <button type='button' className='closerl' onClick={() => RegShow()}>
                <span aria-hidden="true">&times;</span>
              </button>
                
                <label htmlFor="firstName">First Name</label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                <label htmlFor="userName">User ID</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="email">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}></input>
                { error && <p className='error'>{ error }</p>}
                <button type='submit' className='reg-sub' onClick={handleReg}>Register</button>          
            </form>
    </div>
  )
}

export default Reg