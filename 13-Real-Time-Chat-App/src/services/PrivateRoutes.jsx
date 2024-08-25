import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import {useAuth} from "./AuthContext"

function PrivateRoutes() {

    const {} = useAuth();
  return (
    <>
      { user ? <Outlet /> : <Navigate to = "./login" />}
    </>
  );
};

export default PrivateRoutes
