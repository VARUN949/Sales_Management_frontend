import React, { useEffect, useState, useContext } from 'react'
import MyContext from '../../Context/MyContex'

export default function Order({ order }) {
    const [customer, setCustomer] = useState([{}])
    const [salesEmployee, setSalesEmplyee] = useState([{}])
    const [product, setProduct] = useState([{}])
    const { user } = useContext(MyContext)


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

    const updateStatus = async () => {
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
        <div>
            {console.log(salesEmployee)}
            {customer && salesEmployee && product &&
                <div className=" border h-auto mt-24 m-auto w-100 mb-20 bg-slate-400 w-1/3 rounded">
                    <div className='flex m-4'>
                        <p>Pruduct ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product[0].Name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Qunity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                        <p>{order.Qunity}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Approval From SaleEmployee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        {order.approvalFromSaleEmployee ? <p>{order.approvalFromSaleEmployee === true ? "Approved" : "rejected"}</p> : <p>pending</p>}
                    </div>
                    <div className='flex m-4'>
                        <p>customerID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{customer[0].name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>salesEmployeeID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{order.salesEmployeeID}</p>
                    </div>
                    <div className='flex m-4'>
                        {user.role === "salesEmployee" && order.approvalFromSaleEmployee !== true &&
                            <>
                                <button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={updateStatus}>Accept</button>
                                <button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' >Reject</button>
                            </>
                        }

                    </div>
                </div>
            }
        </div>
    )
}