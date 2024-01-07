import React from 'react'

export default function Customer({ customer }) {

    const deleteCustomer = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/customer/byid', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customerId": `${customer._id}`
            }),
        });
        if (response.ok) {
            alert("customer successfully deleted")
            document.getElementById(`customerid_${customer._id}`).style.display = 'none';
        }
    }


    return (
        <div>
            <div id={`customerid_${customer._id}`}>
                {console.log(Object.keys(customer))}
                {customer &&
                    < div className=" border h-auto mt-24 m-auto w-100 mb-20 bg-slate-400 w-1/3 rounded">
                        <div className='flex m-4'>
                            <p> Customer Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{customer.name}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>Customer Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{customer._id}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>Customer Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{customer.email}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>Customer Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                            <p>{customer.contact}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>Customer City &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{customer.address.city}</p>
                        </div>
                        <div className='flex m-4'>
                            {<button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={deleteCustomer}>Delete</button>

                            }

                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
