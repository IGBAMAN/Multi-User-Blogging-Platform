  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import React from 'react'
  import './index.css'
  import { Provider } from 'react-redux'
  import { store } from '../store.js'
  import App from './App.jsx'
  import Login from './pages/Login.jsx'
  import Signup from './pages/Signup.jsx'
  import HomePage from './pages/HomePage.jsx'  
  import AllPost from './pages/ShowAllPost.jsx'
  import AddPost from './pages/AddPost.jsx'
  import Edit from './pages/EditPost.jsx'
  import ValidEdit from './pages/EditOption.jsx'
  import { createBrowserRouter, Router, RouterProvider } from 'react-router'
  import AuthStatus from './Components/AuthStatus.jsx'

  const router=createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<HomePage/>

        },
        {
          path:'/login',
          element:  
          <AuthStatus auth={false}>
            <Login/>
          </AuthStatus>
        },
        {
          path:'/sign-up',
          element:
          <AuthStatus auth={false}>
            <Signup/>
          </AuthStatus>
          
          
        },
        {
          path:'/Posts',
          element:<AllPost/>
        },
        {
          path:'/add-post',
          element:
          <AuthStatus auth={true}>
            <AddPost/>
          </AuthStatus>
        },
        {
          path:'/Edit/:id',
          element:
          <AuthStatus auth={true}>
            <Edit/>
          </AuthStatus>

        }
        ,
        {
          path:'/post/:id',
          element:<ValidEdit/>  //here auth already handled
        }
      ]
    }
  ])
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

    </React.StrictMode>

  )
