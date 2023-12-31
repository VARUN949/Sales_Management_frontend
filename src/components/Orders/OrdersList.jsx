import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../Context/MyContex'
import Order from "./Order"
export default function OrderList() {

    const { user } = useContext(MyContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        generateOrder()
    }, [])
    const generateOrder = async () => {
        if (user.role === "salesEmployee") {
            console.log(user)
            const response = await fetch('https://salesmanagement.onrender.com/order/salesEmployeeID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "salesEmployeeID": `${user.id}`
                }),
            });
            const data = await response.json()
            if (response.ok) {
                setOrders(data)
            }
            else {
                console.log("fail")
                alert("internet issue")
            }
        }
        if (user.role === "customer") {
            console.log(user)
            const response = await fetch('https://salesmanagement.onrender.com/order/customerID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "customerID": `${user.id}`
                }),
            });
            const data = await response.json()
            if (response.ok) {
                setOrders(data)
            }
            else {
                console.log("fail")
                alert("internet issue")
            }
        }
    }

    const largeOrder = () => {
        if (orders.length > 2) {
            document.getElementById("ordres").style.height = "auto"

        }
    }

    return (
        <div className='h-[100vh] bg-slate-700' id="ordres">

            {user.role === "salesEmployee" && orders && orders.map((order, index) => {
                console.log(order)
                return (<Order order={order} key={index} />)
            })
            }
            {largeOrder()
            }
            {user.role === "customer" && orders && orders.map((order, index) => {
                console.log(order)
                return (<Order order={order} key={index} />)
            })
            }

        </div>
    )
}