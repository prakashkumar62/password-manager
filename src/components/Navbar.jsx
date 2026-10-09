import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='container bg-gray-500 flex justify-between items-center py-4 px-4'>
        <div className='logo font-bold text-2xl'> <span className='text-blue-700'>&lt;</span> lo
        <span className='text-blue-700'>go&gt;</span>
        
        </div>
        <ul>
            <li className='flex gap-5'>
                <a className='hover:font-bold text-xl' href="/">Home</a>
                <a className='hover:font-bold text-xl'href="/about">About</a>
                <a className='hover:font-bold text-xl' href="/contact">Contact</a>
            </li>
        </ul>


    </nav>
    </>
  )
}

export default Navbar
