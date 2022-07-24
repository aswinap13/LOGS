import React from 'react'
import Courses from './Courses'
import Header from './Header'
import Navigate from './Navigate'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Teach() {
  const userdata = useLocation().state
  
  const navigate = useNavigate()

  if (userdata === null) {
    console.log('please login again')
    navigate.login('/login')
  }


  return (
    <div>
        <Header userdata={userdata}/>
        <div className='body'>
        <Courses/>

        {/* Navigate Component is shown only when Nav button in header is trigd
        <Navigate/> 
        */}
        </div>

    </div>
  )
}

export default Teach