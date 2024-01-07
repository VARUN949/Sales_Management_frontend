import React, { useEffect, useState, useContext } from 'react'
import MyContext from '../../Context/MyContex'

export default function Order({ order }) {
    const [customer, setCustomer] = useState([{}])
    const [salesEmployee, setSalesEmplyee] = useState([{}])
    const [product, setProduct] = useState([{}])
    const { user } = useContext(MyContext)
    const [status, setStatus] = useState(order.approvalFromSaleEmployee)

    const getCustomer = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/customer/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customerID": `${order.customerID}`
            }),
        });
        const data = await response.json()
        if (response.ok) {
            setCustomer(data)
        }
    }

    const getSalesEmployee = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/salesEmployee/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "SalesEmployeesID": `${order.salesEmployeeID}`
            }),
        });
        const data = await response.json()
        if (response.ok) {
            // console.log(data)
            setSalesEmplyee(data)
        }
    }
    const getProduct = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/product/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "productID": `${order.PruductID}`
            }),
        });
        const data = await response.json()
        if (response.ok) {
            setProduct(data)
        }
    }

    const deleteOrder = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/order/byid', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "orderId": `${order._id}`
            }),
        });
        if (response.ok) {
            alert("order successfully deleted")
            document.getElementById(`orderid_${order._id}`).style.display = 'none';
        }
    }

    const updateStatusAccept = async () => {
        const response = await fetch(`https://salesmanagement.onrender.com/order/${order._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "approvalFromSaleEmployee": true
            }),
        });
        if (response.ok) {
            setStatus(true)

            const response2 = await fetch(`https://salesmanagement.onrender.com/bill-generator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        orderId: order._id,
                        productName: product[0].Name,
                        productId: product[0]._id,
                        customerId: customer[0]._id,
                        SalesEmployeeId: salesEmployee[0]._id,
                        quntity: order.Qunity,
                        price: product[0].Price,
                        totalPrice: order.Qunity * product[0].Price
                    }
                ),
            });

            if (response2.ok) {
                const response3 = await fetch(`https://salesmanagement.onrender.com/send-mail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            mail: salesEmployee[0].email,
                            filename: `${order._id}.txt`
                        }
                    ),
                });

                const response4 = await fetch(`https://salesmanagement.onrender.com/send-mail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            mail: customer[0].email,
                            filename: `${order._id}.txt`
                        }
                    ),
                });

                if (response3.ok && response4.ok) {
                    alert("mail sended successfully")
                }
            }
            alert("update successfully")
        }

    }
    const updateStatusRejected = async () => {
        const response = await fetch(`https://salesmanagement.onrender.com/order/${order._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "approvalFromSaleEmployee": false
            }),
        });
        if (response.ok) {
            setStatus(false)
            alert("update successfully")
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getProduct()
        getSalesEmployee()
        getCustomer()
    }, [])


    return (
        <div id={`orderid_${order._id}`}>
            {customer && salesEmployee && product &&
                <div className=" border h-auto mt-24 m-auto w-100 mb-20 bg-slate-400 w-1/3 rounded">
                    <div className='flex m-4'>
                        <p>OrderID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{order._id}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Pruduct ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product[0].Name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Qunity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                        <p>{order.Qunity}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Approval From SaleEmployee &nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        {status === true || status === false ? <p>{status === true ? "Approved" : "rejected"}</p> : <p>pending</p>}
                    </div>
                    <div className='flex m-4'>
                        <p>customerID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{customer[0].name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>salesEmployeeID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{order.salesEmployeeID}</p>
                    </div>
                    <div className='flex m-4'>
                        {user.role === "salesEmployee" && status !== true && status !== false &&
                            <>
                                <button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={updateStatusAccept}>Accept</button>
                                <button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={updateStatusRejected}>Reject</button>
                            </>
                        }
                        {
                            user.role === "admin" &&
                            <button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={deleteOrder}>Delete</button>

                        }

                    </div>
                </div>
            }
        </div>
    )
}