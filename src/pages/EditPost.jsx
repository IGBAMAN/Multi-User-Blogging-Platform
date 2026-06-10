import React, { useEffect } from "react";
import { dbObj } from "../appwriteConfig/DB_read_write_service";
import { useState } from "react";
import { useNavigate } from "react-router";
import PostForm from '../Components/Postform'
import { useParams } from "react-router";
export default function Edit(){

    const [post,setpost]=useState()
    const nav=useNavigate()
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dbObj.getBlogPost(id).then((fetchedPost) => {
                if (fetchedPost) {
                    setpost(fetchedPost);
                } else {
                    nav('/');
                }
            }).catch((err) => {
                console.error("Failed to read post:", err);
                nav('/');
            });
        }
    }, [id, nav]);


    return post? <div className="py-10 m-1.5">
        <PostForm post={post}/>
    </div> : null
}