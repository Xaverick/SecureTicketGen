import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const { Context } = require('./context');


const PrivateRoutes = () => {
  const user = localStorage.getItem('user') 
  
    return(
        user ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRoutes