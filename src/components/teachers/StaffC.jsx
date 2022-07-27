import React from 'react'

function StaffC({ userdata }) {
  return (
    <div><h3>{userdata.first_name} {userdata.last_name}</h3></div>
  )
}

export default StaffC