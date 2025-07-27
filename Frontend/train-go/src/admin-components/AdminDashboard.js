import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

export default function AdminDashboard() {
  return (
    <div>
        <div className='mb-5'>
        <AdminNavbar/>
        </div>
        <Outlet/>
    </div>
  )
}
