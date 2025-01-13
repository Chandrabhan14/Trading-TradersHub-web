import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    let googledata = localStorage.getItem("googledata");

  
    useEffect(() => {
        if(!googledata){
            navigate('/')
        }
    },[])
 
  return (
    <>
    {googledata ? <Component/> : null}
  
    </>
  )
}
export default ProtectedRoute;