import React from 'react'
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import { ToastContainer } from "react-toastify";

export default function Config() {
  return (
    <div className="container">
      <Sidebar />
      <div className="appContainer">
        <Header />
        <div className="pages">
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
