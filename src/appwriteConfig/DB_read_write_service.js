import {Client, Databases,Storage, ID, Query} from 'appwrite'
import config from '../config';

export default class DBService{
    client= new Client()
    database;
    bucket ;        
    constructor(){      //only created when user account is created and logged in
        this.client
        .setEndpoint(config.appwriteEND)
        .setProject(config.project)
        this.database=new Databases(this.client) 
        this.bucket = new Storage(this.client)
    }

    async createBlogPost({title,content,userId,coverImg,status}){  
        try{
            return await this.database.createDocument(config.dbLink,config.collection,ID.unique(),
           { title,
            content,
            userId,
            coverImg,
            status
            }
            )
        }catch(error){
            console.error("Error creating blog post:", error)
        }
    }

    async editBlogPost(postId,{title,content,coverImg,status}){
        try{
            return await this.database.updateDocument(config.dbLink,config.collection,postId,
                {
                    title,
                    content,
                    coverImg,
                    status
                }
            )
        }
        catch(error){
            console.error("Error editing blog post:", error)
        }
    }

    async deleteBlogPost(postId){
        try{
            return await this.database.deleteDocument(config.dbLink,config.collection,postId)
        }
        catch(error){
            console.error("Error deleting blog post:", error)
        }
    }

    async getBlogPost(postId){ 
        try{
            return await this.database.getDocument(config.dbLink,config.collection,postId)
        }  
        catch(error){
            console.error("Error fetching blog post:", error)
        }
    }

    async getAllBlogPosts(query=[Query.equal('status','active')]){    //only posts with active status will be fetched
        try{
            return await this.database.listDocuments(config.dbLink,config.collection,query)
        }
        catch(error){
            console.error("Error fetching blog posts:", error)
        }
    }


    //upload file services

    async uploadMedia(file){
        try {
                if (file) {
                    
                    // Appwrite requires the file object directly
                return await this.bucket.createFile(config.bucket, ID.unique(), file);
                }
                
            } 
        catch (error) {
                console.error("Appwrite Service :: uploadMedia :: error", error);
                return null;
        }
    }

    async deleteMedia(fileId){
        try{
            return await this.bucket.deleteFile(config.bucket,fileId)
        }
        catch(error){
            console.error("Error deleting media:", error)
        }  
    }


    previewMedia(fileId){
        return this.bucket.getFilePreview(config.bucket,fileId)
    }

    fileDownload(fileId){
        return this.bucket.getFileDownload(config.bucket,fileId)
    }
}

export const dbObj = new DBService()