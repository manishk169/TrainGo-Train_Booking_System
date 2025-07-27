import React from 'react'
import UserNavbar from './UserNavbar'
import { Outlet } from 'react-router-dom'

export default function UserDashboard() {
  return (
    <div>
      <div className='mb-5'>
        <UserNavbar />
      </div>
      <Outlet/>
    </div>
  )
}
