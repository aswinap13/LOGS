import React from 'react'
import './reg.css'
function Reg(props) {
    const regVisible=props.regVisible;
    const RegShow=props.RegShow;
  return (
    <div>
        
        <form className='reg'> 
        <p><b>Register as a Faculty</b></p>         
              <button type='button' className='closerl' onClick={() => RegShow()}>
                <span aria-hidden="true">&times;</span>
              </button>
                
                <label htmlFor="userName">Full Name</label>
                <input type="text"></input>
                <label htmlFor="userName">ID</label>
                <input type="text"></input>
                <label htmlFor="userName">PhoneNumber</label>
                <input type="text"></input>
                <label htmlFor="userID">Your Password</label>
                <input type="password" ></input>
                <button type='submit' className='reg-sub' >Register</button>          
            </form>
    </div>
  )
}

export default Reg