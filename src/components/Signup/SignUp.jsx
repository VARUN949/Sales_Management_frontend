import React, { useState, useContext } from 'react'
import MyContext from '../../Context/MyContex'
import SignUpAdmin from './SignUpAdmin'
import SignUpCustomer from './SignupCustomer';
import SignupSalesEmployee from './SignupSalesEmployee'
export default function SignUp() {

    const { user } = useContext(MyContext);

    // const baseUrl = "https://salesmanagement.onrender.com/signup"
    // const [SignupData, setSignupData] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // })
    const [role, setRole] = useState("salesEmployee")


    const handleChange = (e) => {

        if (e.target.value === "salesEmployee" || e.target.value === "admin" || e.target.value === "customer") {
            setRole(e.target.value)
        }
    }


    return (
        <div>
            <div className='h-[100vh] W-100 mb-8'>
                {console.log(user)}

                <div className='flex mt-20 text-white text-4xl font-bold'>
                    <h1 className='flex m-auto'>Sign Up</h1>
                </div>

                <div className='w-1/3 m-auto mt-20'>
                    <form className="flex w-auto text-white border rounded-3xl p-5 bg-slate-600 flex-col">
                        <div className='mb-5 text-black'>
                            <label className=" text-1xl text-white" htmlFor="role">Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <select onChange={handleChange} className=" relative " id="role">
                                <option value="salesEmployee">Sales Employee</option>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        {/* <div className='flex justify-center'>
                            <button className='rounded text-white border w-1/6' type="submit">submit</button>
                        </div> */}
                    </form>
                </div>
                {role === "admin" &&
                    <SignUpAdmin role={role}></SignUpAdmin>
                }
                {role === "customer" &&
                    <SignUpCustomer role={role}></SignUpCustomer>
                }
                {role === "salesEmployee" &&
                    <SignupSalesEmployee role={role}></SignupSalesEmployee>
                }

            </div>
        </div>
    )
}