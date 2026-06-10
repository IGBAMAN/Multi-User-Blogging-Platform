import React  from "react";
import {useNavigate, useNavigation} from "react-router";
import Logout from "./logoutButton";
import { useSelector } from "react-redux";
import { authSlice } from "../../../features/authSlice";
import { Link, Navigate } from "react-router";
import Logo from "../logo";
import Container from "../container";
export default function Header(){
    const nav=useNavigate()
    const authStatus=useSelector((state)=> state.auth.status)
    const navItems=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'login',
            slug:'/login',
            active:!authStatus,
        },
        {
            name:'Signup',
            slug:'/sign-up',
            active:!authStatus
        },
        {
            name:'All Posts',
            slug:'/Posts',
            active:true,

        },
        {
            name:'Add Post',
            slug:'/add-post',
            active:authStatus
        }


    ]
    return(
        
            <div className="py-4 w-full shadow-sm bg-black">
                <Container>
                    <nav className="flex space-x-1.5 bg-gray-800 p-4 rounded-full text-amber-50">
                        <Link to={'/'}>
                            <Logo width="89px"/>
                        </Link>
                        <ul className="flex ml-auto space-x-1.5">
                            {navItems.map((item)=>
                                item.active ? (
                                    <li key={item.name}
                                    >
                                        <button
                                            onClick={()=>nav(item.slug)}
                                            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-500 shadow-blue-900 shadow-2xl drop-shadow-cyan-600 rounded-full"
                                        >
                                        {item.name}
                                        </button>
                                    </li>

                                ) : null
                            )
                            }
                            {/* adding logout button */}
                            {authStatus && (
                                <li>
                                    <Logout/>
                                </li>
                            )}

                        </ul>
                    </nav>
                </Container>
            </div>
      
    )
}