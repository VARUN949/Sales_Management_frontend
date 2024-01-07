import React, { useContext } from 'react'
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
                    <NavbarItem name="order" link="order" />
                    <button href="/" onClick={SignOut}><NavbarItem name="SignOut" link="Login" /></button>
                </>
            }
            {
                user.role === "customer" &&
                <>
                    <NavbarItem name="Products" link="Products" />
                    <NavbarItem name="order" link="order" />
                    <button onClick={SignOut}><NavbarItem name="SignOut" link="Login" /></button>
                </>
            }
            {
                user.role === "admin" &&
                <> <NavbarItem name="New Product" link="newProduct" />
                    <NavbarItem name="All Orders" link="allOrders" />
                    <NavbarItem name="All Customers" link="allCustomers" />
                    <NavbarItem name="All SalesEmployees" link="allSalesEmployee" />


                    <button onClick={SignOut}><NavbarItem name="SignOut" link="Login" /></button>
                </>
            }
            {
                user.role === "" &&
                <>
                    <NavbarItem name="Login" link="Login" />
                    <NavbarItem name="Signup" link="Signup" />
                </>
            }
        </div>
    )
}