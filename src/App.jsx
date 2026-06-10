import { useState,useEffect,useContext, } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {store} from '../store'
import { authObj } from './appwriteConfig/Auth_service'
import { Provider } from 'react-redux'
import { login,logout } from '../features/authSlice'
import { Outlet } from 'react-router'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
//imported vite router redux(setting sync) appwrite(backend service) rect-form-hook(better form functionality like login signup form) html-react-parse (to parse html of article written correctly in react) tinymce(text editor of blog)

function App() {
  const [loading,setloading]=useState(true)  //to set loading while fetching data from db
  const dispatch=useDispatch()

  useEffect(()=>{
    authObj.checkAuthStatus().then(
      (userData)=>{
        if(userData) dispatch(login(userData))
        else dispatch(logout())
      }
    )
    .finally(()=>setloading(false))  //after no user was found end the loading screen
    
  },[])
  
  return (
    <>
      <div className='min-h-screen bg-gray-700  content-between  gap-5'>
        <Header/>
          <Outlet/>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
