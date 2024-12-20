import React from 'react'
import logo from '../assets/logo.jpg'

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between px-[4%] py-2'>
            <img className='w-[max(10%,80px)]' src={logo} alt='logo'></img>
            <button onClick={()=> setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar