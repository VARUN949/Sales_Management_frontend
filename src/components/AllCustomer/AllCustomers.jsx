import Customer from './Customer'
import React, { useEffect, useState } from 'react'


export default function AllCustomers() {

    const [customers, setCustomers] = useState([])


    useEffect(() => {
        generateCustomers()
    }, [])
    const generateCustomers = async () => {

        const response = await fetch('https://salesmanagement.onrender.com/customer', {
            method: 'GET',
        });
        const data = await response.json()
        if (response.ok) {
            setCustomers(data)
        }
        else {
            alert("no  customers")
        }
    }

    const largeOrder = () => {
        if (customers.length > 3) {
            document.getElementById("customers").style.height = "auto"

        }
    }


    return (
        <div className='h-[100vh] bg-slate-700' id="customers">

            {customers && customers.map((customer, index) => {
                return (<Customer customer={customer} key={index} />)
            })
            }
            {largeOrder()
            }
        </div>
    )
}
