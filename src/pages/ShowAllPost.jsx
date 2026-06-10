import React, { useEffect, useState } from "react";
import { dbObj } from "../appwriteConfig/DB_read_write_service";
import PostCont from "../Components/PostCont";

export default function AllPosts(){
    const [posts, setposts] = useState([]);

    useEffect(() => {
        // Leave empty or drop parameter entirely to use the default 'active' query
        dbObj.getAllBlogPosts().then((post) => {
            if (post) {
                setposts(post.documents);
            }
        });
    }, []); // Empty dependency array prevents repeated re-renders

    return (
        <div className="flex flex-wrap m-2">
            {posts.map((post) => (
               <div key={post.$id} className="p-7 m-1.5 rounded-4xl w-1/2">
                    <PostCont {...post} />
               </div> 
            ))}
        </div>
    );
}