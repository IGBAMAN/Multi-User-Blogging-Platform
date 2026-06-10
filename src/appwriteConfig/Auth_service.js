import {Client,ID,Account} from 'appwrite'
import config from '../config';

//creating auth service class

export class  AuthUser{
    client= new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteEND)
        .setProject(config.project)
        //after client has been setup now account can be created
        this.account = new Account(this.client)
    }

    //async until user not signed up 
    async createUser({email,name,password}){
        try{
           const user = await this.account.create(ID.unique(),email,password,name) //create () method of appwrite (if i want to change db then i will only change these inner functionality instead of seraching for all appwrite methods)
           if (user) {
            //after account created redirected to login page
           return this.login({email,password})
            
           } else {
            return null
            
           }
        }catch(e){
            console.error(e)
        }

    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password) //createEmailPasswordSession() method of appwrite to create a session for the user
        }catch(e){
            console.error(e)
        }
    }
    async  checkAuthStatus() {
        try {
            // If successful, user is authenticated
            const user = await this.account.get() //get() method of appwrite to get user details
            return user;
        } catch (error) {
            console.error("User is not authenticated:");
            // Redirect to login page or show login UI
            // window.location.href = '/login';
            return null;
        }
    }
    async logout(){
        try{
            await this.account.deleteSession('current') //deleteSession() method of appwrite to delete the current session

        }
        catch(e){
            console.error(e)
        }
    }
}

export const authObj= new AuthUser()

//to make proj independant of appwrite methods and decouple components UI with  bussiness logic
// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setProject('<PROJECT_ID>') // Your project ID
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1');

// const account = new Account(client);

// try {
//     const user = await account.create({
//         userId: '[USER_ID]',
//         email: 'email@example.com',
//         password: '<Password>'
//     });
//     console.log(user)
// } catch (e){
//     console.error(e)
// }

