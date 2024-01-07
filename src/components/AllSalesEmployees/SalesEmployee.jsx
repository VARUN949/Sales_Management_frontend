import React from 'react'

export default function SalesEmployee({ salesEmployee }) {

    const deleteSalesEmployee = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/salesEmployee/byid', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "salesEmployee": `${salesEmployee._id}`
            }),
        });
        if (response.ok) {
            alert("salesEmployee successfully deleted")
            document.getElementById(`salesEmployeeid_${salesEmployee._id}`).style.display = 'none';
        }
    }


    return (
        <div>
            <div id={`salesEmployeeid_${salesEmployee._id}`}>
                {console.log(Object.keys(salesEmployee))}
                {salesEmployee &&
                    < div className=" border h-auto mt-24 m-auto w-100 mb-20 bg-slate-400 w-1/3 rounded">
                        <div className='flex m-4'>
                            <p>SalesEmployee Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{salesEmployee.name}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>SalesEmployee Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{salesEmployee._id}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>SalesEmployee Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{salesEmployee.email}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>SalesEmployee Contact &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                            <p>{salesEmployee.contact}</p>
                        </div>
                        <div className='flex m-4'>
                            <p>SalesEmployee City &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                            <p>{salesEmployee.city}</p>
                        </div>
                        <div className='flex m-4'>
                            {<button className='mr-5 border w-24 bg-slate-700 text-white rounded-md ' onClick={deleteSalesEmployee}>Delete</button>

                            }

                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
