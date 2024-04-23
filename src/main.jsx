import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Homepage from './HomePage.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Password from './Password.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Signup/>
  },
  {
    path:'/password',
    element:<Password/>
  },
  {
    path: '/',
    element: <Homepage />
  },


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router } />
  </React.StrictMode>,
)
