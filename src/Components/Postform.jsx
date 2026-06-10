import React, { useEffect } from "react";
import { dbObj} from "../appwriteConfig/DB_read_write_service";
import {Input} from "./UniversalInput";
import {store} from "../../store";
import Button from "./UniversalButton";
import Rte from "./RTE";
import {Select} from "./UniversalSelect";
import { useSelector } from "react-redux";
import { get, useForm, Watch } from "react-hook-form";
import { useNavigate } from "react-router-dom";''
import { useCallback } from "react";
import { Condition } from "appwrite";
export default function PostForm({post}){
    const {register,handleSubmit,watch,getValues,control,setValue,reset}=useForm({

        defaultValues:{
            title:post?.title ||  '',
            content :post?.content || '',
            slug  : post?.slug || '',
            status : post?.status || 'active',


        },
        


    })  
    useEffect(() => {
        if (post) {
            reset({
                title: post.title || '',
                content: post.content || '',
                slug: post.slug || '',
                status: post.status || 'active',
            });
        }
    }, [post, reset]);
    const userData=useSelector((state)=> state.auth.userData)
        console.log("post data:",post)
    
    const nav=useNavigate()
        const slugTransform = (value) => {
            if (value && typeof value === 'string') {
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, '-') // Replace all non-alphanumeric chars with -
                    .replace(/\s+/g, '-');         // Replace all spaces with -
            }
            return "";
        }

        React.useEffect(()=>{
            const subs=watch((value,{name})=>{
                if(name=='title'){
                    setValue('slug',slugTransform(value.title))
                }    

            })

            return(()=> subs.unsubscribe())  //avoid looping of method stored under the name subs
        },[watch,slugTransform,setValue])
const submit = async (data) => {
        
    try {
        console.log("Form submitted with data:", userData, data);
        console.log("Post prop:", post);
        if (post!==undefined) {
            // EDIT POST LOGIC
            const file = data.image[0] ? await dbObj.uploadMedia(data.image[0]) : null;
            console.log("File upload result:", file);

                
            if (file) {
                // Delete old image if a new one is uploaded  from db
                await dbObj.deleteMedia(post.coverImg);
            }
            //here updating the imag in ui fetching from db
            const dbPost = await dbObj.editBlogPost(post.$id, {
                ...data,
                coverImg: file ? file.$id : post.coverImg,
            });


            if (dbPost) {
                nav(`/post/${dbPost.$id}`);
            }
        } 
        else {
            // CREATE NEW POST LOGIC
            // 1. uploading new image in db

            const file = (data.image[0] )? await dbObj.uploadMedia(data.image[0]) : null;
            console.log("File upload result:", file);

            // 2. Only proceed if the file upload succeeded
            if (file) {
                const fileId = file.$id;
                data.coverImg = fileId;
                
                const dbPost = await dbObj.createBlogPost({
                    ...data,
                    userId: userData.$id,
                    content: data.content ,
                    // Make sure you have userData available
                });

                // 3. Guard check before navigating
                if (dbPost) {
                    nav(`/post/${dbPost.$id}`);
                } else {
                    console.error("Failed to create post document in Database");
                }
            } 
            else {
                console.error("File upload failed. Check Appwrite storage permissions.");
            }
        }
    } 
    catch (error) {
        console.error("Error caught post not created/updated:", error);
    }
    };

    return(
        <>
            <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-6 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-800/60 shadow-2xl">
                <div className="lg:col-span-2 space-y-6">
                    {/* title input */}
                    
                    <Input
                        className='w-full text-taupe-100 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200'
                        label='Title'
                        placeholder='Enter a catchy post title...'
                        type='text'
                        
                        {...register('title',{required:true})}
                    />
                    {/* Slug input */}
                    <Input
                        className='w-full text-taupe-200 bg-slate-900/40 border border-slate-800/80 rounded-xl px-4 py-2.5 focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70 transition-all duration-200 opacity-90'
                        label='slug'
                        placeholder='slug-auto-generated'
                        {...register('slug',{required:true})}
                    />
                    {/* RTE */}
                    <Rte
                        className='rounded-xl border    border-slate-800 overflow-hidden shadow-inner'
                        label='Editor'
                        name='content'
                        control={control}  //giving parent control 

                    />

                
                
                </div>
                {/* right side */}
                <div className="space-y-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 h-fit backdrop-blur-sm shadow-xl">
                    <div className="w-full space-y-4">   
                        {/* featured image shown if post is edited */}
                        {post && <div className="relative group overflow-hidden rounded-xl border border-slate-800 shadow-md">
                            <img src={dbObj.fileDownload(post.coverImg)} alt="Image post not found" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                            </div>
                        }
                        {/* input for image */}
                    {/* Standard HTML Input */}
                    
                    <label htmlFor="file-upload" className="block text-sm font-semibold text-slate-300 tracking-wide uppercase mb-1">Featured Image</label>
                    <Input 
                        
                        type="file"
                        accept="image /*"
                        {...register("image", { required: !post })}
                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/10 file:text-purple-400 hover:file:bg-purple-600/20 file:transition-all cursor-pointer bg-slate-950/60 border border-slate-800 rounded-xl p-2 focus:outline-none focus:border-purple-500"
                    />

                        
                    </div>
                        {/* selection of status */}

                        <Select
                        label='Status'
                        options={['active','inactive']}
                        {...register('status',{required:true})}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                        />

                        <Button type="submit" onClick={() => console.log('this chk')} className={`${post ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30" : "bg-purple-600 hover:bg-purple-500 shadow-purple-900/30"} w-full py-3.5 px-6 font-bold text-white rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transform-gpu transition-all duration-150 tracking-wide mt-2`}>
                            {post ? "Update" : "Submit"}   
                            {/* children */}
                        </Button>



                </div>
            </form>
        </>
    )

}
