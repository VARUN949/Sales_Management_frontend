import React, { useEffect, useState } from 'react'
import Order from "./Order"
export default function AllOrder() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        generateOrder()
    }, [])
    const generateOrder = async () => {

        const response = await fetch('https://salesmanagement.onrender.com/order', {
            method: 'GET',
        });
        const data = await response.json()
        if (response.ok) {
            setOrders(data)
        }
        else {
            alert("no  orders")
        }

    }

    const largeOrder = () => {
        if (orders.length > 2) {
            document.getElementById("ordres").style.height = "auto"

        }
    }

    return (
        <div className='h-[100vh] bg-slate-700' id="ordres">

            {orders && orders.map((order, index) => {
                return (<Order order={order} key={index} />)
            })
            }
            {largeOrder()
            }
        </div>
    )
}