import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import LandPage from './pages/LandPage/LandPage';
import Cadastrar from './pages/Cadastrar/Cadastrar';



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandPage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastrar",
    element: <Cadastrar/>
  },
  {
    path: "/home",
    element: <Home/>
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <RouterProvider   router={router}/>
  </React.StrictMode>
);


reportWebVitals();
