import React from 'react'
import Navbar from './features/Navbar'
import Footer from './features/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="bg-[#020617] min-h-screen flex flex-col">
        <Navbar/>
        
        <main className="flex-grow">
            <Outlet/>
        </main>
        
        <Footer/>
    </div>
  )
}

export default AppLayout