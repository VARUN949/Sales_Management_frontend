import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarItem({ name }) {



    return (
        <div className='m-20 text-2xl font-Comic font-extrabold text-white '>
            <Link to={name === "SignOut" ? '/Login' : `/${name}`}  >
                {
                    name.split(/(?=[A-Z])/).length > 1 ?
                        ` ${name.split(/(?=[A-Z])/)[0]} ${name.split(/(?=[A-Z])/)[1]}` :
                        `${name.split(/(?=[A-Z])/)[0]}`
                }
            </Link>
        </div >
    )
}