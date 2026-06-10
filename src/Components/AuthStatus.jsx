import React from "react";

import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Protected({children,auth=true}){

    const nav=useNavigate()
    const[loader,setloader]=useState(true)
    const authStatus=useSelector((state)=> state.auth.status)  //(auth )reducer 


    useEffect(()=>{
            if(!auth && authStatus!==auth) nav('/')
            else if(auth && auth!==authStatus) nav('/login')
            setloader(false)
    },[authStatus,nav,loader])

    return loader? <h1>Loading...</h1> : <>{children}</>
        
       
    
}