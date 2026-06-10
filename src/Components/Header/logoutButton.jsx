import React from "react";
import { logout } from "../../../features/authSlice";
import { authObj } from "../../appwriteConfig/Auth_service";
import { useDispatch } from "react-redux";

export default function Logout(){
    const dispatch=useDispatch()

    const handleLogout=()=>
    authObj.logout().then(()=> dispatch(logout())) //first deleting session from db and then updating that info in store

    return(
        
        <button type="button" 
        onClick={handleLogout}
        className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-150 ease-in-out transform-gpu"
>logout
        </button>
        
    )
}