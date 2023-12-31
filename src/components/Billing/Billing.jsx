import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../Context/MyContex'


export default function Billing() {

    const { buyProduct } = useContext(MyContext)
    const [customer, setCustomer] = useState([{}])
    const [salesEmployee, setSalesEmplyee] = useState([{}])
    const [newOrder, setNewOrder] = useState({
        customerID: "",
        salesEmployeeID: "",
        PruductID: "",
        Qunity: 0
    })
    const { user } = useContext(MyContext)

    const newOrderGenerator = async () => {

        setNewOrder({
            PruductID: buyProduct.product._id,
            Qunity: buyProduct.quantity,
            salesEmployeeID: salesEmployee[0]._id,
            customerID: customer[0]._id
        })
        console.log(newOrder)
        console.log(salesEmployee);
        const response = await fetch(' https://salesmanagement.onrender.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),

        });
        const data = await response.json()
        if (response.ok) {
            alert("your order placed")
            setSalesEmplyee(data)
        }
    }

    const getSalesEmployee = async () => {
        console.log(customer);
        const response = await fetch('https://salesmanagement.onrender.com/salesEmployee/city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "city": `${customer[0].address.city}`
            }),
        });
        const data = await response.json()
        if (response.ok) {
            setSalesEmplyee(data)
        }
    }

    const getCustomer = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/customer/id', {
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
            setCustomer(data)
        }
    }

    const handleBuy = (e) => {
        e.preventDefault()
        getSalesEmployee()
        newOrderGenerator()
        console.log(newOrder)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getCustomer()
    }, [])

    return (
        <div className='h-[100vh]'>

            {buyProduct.product && customer &&
                <div className=" border h-auto mt-24 m-auto w-100 mb-30 bg-slate-400 w-1/3 rounded">
                    <div className='flex m-4'>
                        <p>Customer ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{customer[0]._id}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Customer Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{customer[0].name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Customer Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{customer[0].email}</p>
                    </div>



                    <div className='flex m-4'>
                        <p>Pruduct ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{buyProduct.product._id}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Name &nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                        <p>{buyProduct.product.Name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Description &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{buyProduct.product.Description}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>category&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{buyProduct.product.category}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Price &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{buyProduct.product.Price}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Quantity &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{buyProduct.quantity}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Final Amount &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{(buyProduct.quantity) * (buyProduct.product.Price)}</p>
                    </div>
                    <div className='flex m-4'>
                        <button className='rounded-md w-20 text-white border bg-slate-700' onClick={handleBuy}>Buy</button>
                    </div>
                </div>
            }
        </div>
    )
}
