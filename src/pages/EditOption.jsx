import React, { Component } from "react";
import { useNavigate, useParams } from "react-router";
import { useState,useEffect } from "react";
import { dbObj } from "../appwriteConfig/DB_read_write_service";
import {store} from '../../store'
import Button from '../Components/UniversalButton'
import { isAction } from "@reduxjs/toolkit";
import Components from "../Components/container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function ValidPostEdit(){
    const [post,setpost]=useState(null)
    const userData = useSelector((state) => state.auth.userData);
    const Isauthor=post&& userData ? userData.$id===post.userId : false
    const nav=useNavigate()
    //setting post to be operated
    const {id}=useParams()
    useEffect(()=>{
        if(id){
            dbObj.getBlogPost(id).then((fetched)=>{
                if(fetched) setpost(fetched)
                else nav('/')
            })
        }
        
    },[id,nav])

    // if posts exists then onlu logged in user can edit and delete

    const deletepost=(async()=>{

        if(post){
            const deleted =await dbObj.deleteBlogPost(post.$id)
             if(deleted) nav('/')
        }
        
    })

    return post?(
       <Components>
        <div className="w-full mt-1">
               {/* featured image  */}
               <div className="w-full w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img src={dbObj.fileDownload(post.coverImg)} alt="Not loaded" />
               </div>

               {/* showing edit and delete buttons to respective user */}

              

               {/* showing title and desc */}

               <div className="row-start-1 w-full">
                <div>
                    <h1 className="font-bold text-5xl text-amber-50">{post.title}</h1>
                </div>
                <div>
                    <h4 className="text-amber-50">{parse(post.content)}</h4>
                </div>
                 {Isauthor &&
               <div className="right-48 mt-10">
                <Link to={`/Edit/${post.$id}`}>
                    <button className="bg-green-400 mr-2 p-2 rounded-2xl w-20 ">
                        Edit
                    </button>

                </Link>
                <button onClick={deletepost} className="bg-red-500 w-20 p-2 rounded-2xl">
                    Delete
                </button>
               </div> }


               </div>
             
        </div>
       </Components>

    ):null




    
}