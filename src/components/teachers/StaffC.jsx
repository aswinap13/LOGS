import React from 'react'

function StaffC({ userdata }) {
  return (
    <div>{userdata.first_name} {userdata.last_name}</div>
  )
}

export default StaffC