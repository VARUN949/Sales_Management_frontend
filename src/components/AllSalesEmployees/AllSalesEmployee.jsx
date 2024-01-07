import React, { useEffect, useState } from 'react'
import SalesEmployee from './SalesEmployee'


export default function AllSalesEmployee() {

    const [salesEmployees, setSalesEmployees] = useState([])


    useEffect(() => {
        generateSalesEmployees()
    }, [])
    const generateSalesEmployees = async () => {

        const response = await fetch('https://salesmanagement.onrender.com/salesEmployee', {
            method: 'GET',
        });
        const data = await response.json()
        if (response.ok) {
            setSalesEmployees(data)
        }
        else {
            alert("no  SalesEmployees")
        }
    }

    const largeOrder = () => {
        if (salesEmployees.length > 3) {
            document.getElementById("setSalesEmployees").style.height = "auto"

        }
    }


    return (
        <div className='h-[100vh] bg-slate-700' id="setSalesEmployees">

            {salesEmployees && salesEmployees.map((salesEmployee, index) => {
                return (<SalesEmployee salesEmployee={salesEmployee} key={index} />)
            })
            }
            {largeOrder()
            }
        </div>
    )
}
