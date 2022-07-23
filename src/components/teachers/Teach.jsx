import React from 'react'
import Courses from './Courses'
import Header from './Header'
import Navigate from './Navigate'

function Teach() {
  return (
    <div>
        <Header/>
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