import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './admin-components/AdminDashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import AdminHome from './admin-components/AdminHome.js';
import AddTrain from './admin-components/train-components/AddTrain.js';
import Trains from './admin-components/train-components/Trains.js';
import ManageTrain from './admin-components/train-components/ManageTrain.js';
import AddSchedule from './admin-components/schedule-components/AddSchedule.js';
import ManageSchedules from './admin-components/schedule-components/ManageSchedules.js';
import AuthForm from './user-components/AuthForm.js';
import UserHome from './user-components/UserHome.js';
import UserDashboard from './user-components/UserDashboard.js';
import ProtectedAdminRoute from './admin-components/admin-login-components/ProtectedAdminRoute.js';
import AdminLogin from './admin-components/admin-login-components/AdminLogin.js';
import TrainResults from './user-components/TrainResults.js';
import UpdateSchedule from './admin-components/schedule-components/UpdateSchedule.js';
import BookTicket from './user-components/booking-components/BookTicket.js';
import { AuthProvider } from './contexts/AuthContext.js';
import Login from './user-components/auth-components/Login.js';
import Register from './user-components/auth-components/Register.js';
import MyBookings from './user-components/booking-components/MyBookings.js';
import ViewTicket from './user-components/booking-components/ViewTicket.js';
import AddStation from './admin-components/station-components/AddStation.js';
import Stations from './admin-components/station-components/Stations.js';

let routes = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        < AdminDashboard/>
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "/admin",
        index: true,
        element: <AdminHome/>
      },
      {
        path:"/admin/stations",
        element: <Stations/>
      },
      {
        path : "/admin/stations/add",
        element:<AddStation/>
      },
      {
        path:"/admin/trains/",
        element: <Trains/>
      },
      {
        path:"/admin/trains/add",
        element:<AddTrain/>
      },
      {
        path:"/admin/trains/manage-train/:trainId",
        element:<ManageTrain/>
      },
      {
        path:"/admin/manage-train/:trainId/add-schedule",
        element:<AddSchedule/>
      },
      {
        path:"/admin/manage-schedules/view/:trainId",
        element: <ManageSchedules/>
      },
      {
        path:"/admin/manage-schedules/update/:scheduleId",
        element : <UpdateSchedule/>
      }
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin/>
  },
  {
    path:"/",
    element:<UserDashboard/>,
     children: [
      {
        path: "/",
        index: true,
        element: <UserHome/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
      {
        path:"/user/book-ticket",
        element:<BookTicket/>
      },
      {
        path:"/user/results",
        element : <TrainResults/>
      },
      {
        path:"/user/mybookings",
        element:<MyBookings/>
      },
      {
        path:"/user/bookings/viewticket/:bookingId",
        element:<ViewTicket/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={routes}>
    <UserDashboard />
  </RouterProvider>
  </AuthProvider>
  // <RouterProvider router={routes}>
  //   <AdminDashboard />
  // </RouterProvider>
  
);
