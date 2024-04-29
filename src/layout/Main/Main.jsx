// --------------------------------------------------------Imports------------------------------------------------------------
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
// ---------------------------------------------------------------------------------------------------------------------------

const Main = () => {
    return (
        <div className='relative '>
            <div className="">
                <Header />
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default Main
