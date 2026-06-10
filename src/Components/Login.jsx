import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {Input,Button,Logo} from './index'
import {useForm} from 'react-hook-form'
import { useDispatch } from "react-redux";
import { authObj, AuthUser } from "../appwriteConfig/Auth_service";
import { login as StoreLogin,logout } from "../../features/authSlice";

//diff b/w link (w/o clicking the link it won't nav) and useNavigate (auto navigates w/o click)
export default function Login(){
    const dispatch=useDispatch()
    const nav=useNavigate()
    const {register,handleSubmit}=useForm()  //syntax of useForm()
    const login=async   (data)=>{
        console.log(data)
        try {
            //creating session in db
            const session= await authObj.login(data)
            //dispatching login status and userdata in store
            if(session){
                const userData= await authObj.checkAuthStatus()
                if(userData){
                    //dispatched in store
                    dispatch(StoreLogin(userData))
                    nav('/')
                }
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

    return(
        <div className="flex items-center justify-center ">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <div className="space-y-8">
                        <form onSubmit={handleSubmit(login)} className="mt-10">  
                            {/* //handle submit is keyword for hook form and no need to manage states (states will be managed via regiters on submit) */}
                            <div className="mt-5">
                                <Input  
                                    label='Email:'
                                    type='email'
                                    placeholder='Enter your Email'
                                    {...register('email',{  //avoid overrriding the existing register values used in  other fields
                                            required:true,
                                            validate:{
                                                matchPattern:(value)=>  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Enter valid email'

                                            }


                                    })}


                                />
                                <Input  
                                    label='Password:'
                                    type='password'
                                    placeholder='Enter your Password'
                                    {...register('password',{
                                        required:true
                                    })}


                                />
                                <Button 
                                type='submit' children='SignIn' className="w-full mt-5 bg-blue-400 text-center" />
                                <p className="mt-10 text-gray-400 text-center mx-auto">Don't Have an Account?<span >
                                    <Link to={'/sign-up'}
                                    className="hover:text-blue-500 ">Sign-up</Link>
                                    </span>
                                </p>
                            </div>
                        </form>
                        

                    </div>



            </div>



        </div>
    )
}