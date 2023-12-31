import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MyContext from '../../Context/MyContex'

export default function Login() {

    const baseUrl = "https://salesmanagement.onrender.com/login"
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [role, setRole] = useState("salesEmployee")
    const { user, setUser } = useContext(MyContext);
    const navigate = useNavigate();


    const handleChange = (e) => {
        if (e.target.name === "email") {
            setLoginData({
                ...loginData,
                email: e.target.value,
            })
        }

        if (e.target.name === "password") {
            setLoginData({
                ...loginData,
                password: e.target.value,
            })
        }
        if (e.target.value === "salesEmployee" || e.target.value === "admin" || e.target.value === "customer") {
            setRole(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json()
        if (response.ok) {
            setUser({
                role: role,
                id: data.id
            })
            alert("successfully login")
            if (user.role === "salesEmployee") {
                navigate('/order');
            }
            if (user.role === "customer") {
                navigate('/Products');
            }

        }
        else {
            alert(data.error)
        }
    }

    return (
        <div className=''>
            {/* {console.log(user)} */}
            <div className='flex mt-20 text-white text-4xl font-bold'>
                <h1 className='flex m-auto'>Login</h1>
            </div>
            <div className='h-[100vh] W-100 mb-8'>
                <div className='w-1/3 m-auto mt-20'>
                    <form className="flex w-auto text-white border rounded-3xl p-5 bg-slate-600 flex-col">
                        <label className="mb-5 text-1xl">
                            Email ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="text" className="text-black ml-8 rounded-md" name="email" value={loginData.email} onChange={handleChange} />
                        </label>
                        <label className="mb-5 text-1xl">
                            Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="password" className="text-black ml-8 rounded-md" name="password" value={loginData.password} onChange={handleChange} />
                        </label>
                        <div className='mb-5 text-black'>
                            <label className=" text-1xl  relative text-white" htmlFor="role">Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <select onChange={handleChange} className="" id="role">
                                <option value="salesEmployee">Sales Employee</option>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={handleSubmit} className='rounded text-white border w-1/6' type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}