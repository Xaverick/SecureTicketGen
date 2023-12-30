import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const { Context } = require('./context');


const PrivateRoutes = () => {
  const { userInfo, updateUser, setUserInfo } = useContext(Context);
    return(
        userInfo ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRoutes