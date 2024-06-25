import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Home from '../pages/Home'

function PrivateRoute(props) {

  return (
    <>
          {props.token === "" ? <Navigate to={"/login"} /> : props.element}
            
    </>
  )
}

export default PrivateRoute