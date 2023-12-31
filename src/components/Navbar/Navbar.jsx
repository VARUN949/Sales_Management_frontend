import React from 'react'
import NavbarList from './NavbarList'

export default function Navbar() {
    return (
        <div>
            <div className='w-100 bg-slate-600 relative z-2 h-[6vh] pl-24 pr-24 shadow-2xl '>
                <NavbarList />
            </div>
        </div>

    )
}