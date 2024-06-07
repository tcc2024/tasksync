import React from 'react'
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import { ToastContainer } from "react-toastify";
import styles from "./Config.module.css"

export default function Config() {
  return (
    <div className="container">
      <Sidebar />
      <div className="appContainer">
        <Header />
        <div className="pages">
          <div className=''>
            <div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
