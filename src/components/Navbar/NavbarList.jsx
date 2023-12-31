import React, { useContext, useEffect } from 'react'
import NavbarItem from './NavbarItem'
import MyContext from '../../Context/MyContex'

export default function NavbarList() {

    const { user, setUser } = useContext(MyContext)

    const SignOut = async () => {
        setUser({
            role: "",
            id: ""
        })
    }

    return (
        <div className=' h-full flex justify-center items-center '>
            {
                user.role === "salesEmployee" && <>
                    <NavbarItem name="order" />
                    <button href="/" onClick={SignOut}><NavbarItem name="SignOut" /></button>
                </>
            }
            {
                user.role === "customer" &&
                <>
                    <NavbarItem name="Products" />
                    <NavbarItem name="order" />
                    <button onClick={SignOut}><NavbarItem name="SignOut" /></button></>
            }
            {
                user.role === "admin" &&
                <> <NavbarItem name="order" />
                    <button onClick={SignOut}><NavbarItem name="SignOut" /></button></>
            }
            {
                user.role === "" &&
                <>
                    <NavbarItem name="Login" />
                    <NavbarItem name="Signup" />
                </>
            }
        </div>
    )
}