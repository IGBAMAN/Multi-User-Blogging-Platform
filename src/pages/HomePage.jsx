    import React, { useEffect } from "react";
    import { useState } from "react";
    import  Container  from "../Components/container";
    import { dbObj } from "../appwriteConfig/DB_read_write_service";
    import PostCont from "../Components/PostCont";
    export default function Home(){
        const [posts,setposts]=useState([])
        useEffect(()=>{dbObj.getAllBlogPosts().then((post)=>{
            if(post){
                setposts(post.documents)
            }

        })},[])
        if(posts.length==0){
            return(
                <Container>
                    <div className="py-10 w-full bg-red-400 text-center text-amber-50 rounded-4xl text-8xl">Sorry! We could't find anything for you</div>
                </Container>
            )

        

        }
        return(
            <div className="w-full py-2">
                <Container>
                    <div className="flex flex-wrap m-2">
                        {posts.map((post)=>(
                            <div key={post.$id} className="w-1/2 rounded-4xl text-amber-50 p-0.5 m-1 ">
                                <PostCont
                                {...post}
                                />
                            </div>
                        ))}
                    </div>
                    
                </Container>
            </div>
                
        )


    }