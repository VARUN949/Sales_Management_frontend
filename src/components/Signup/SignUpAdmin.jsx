import React, { useState } from 'react'

export default function SignUpAdmin(role) {

    // const { user, setUser } = useContext(MyContext);

    const baseUrl = "https://salesmanagement.onrender.com/signup"
    const [SignupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        if (e.target.name === "email") {
            setSignupData({
                ...SignupData,
                email: e.target.value,
            })
        }
        if (e.target.name === "name") {
            setSignupData({
                ...SignupData,
                name: e.target.value,
            })
        }

        if (e.target.name === "password") {
            setSignupData({
                ...SignupData,
                password: e.target.value,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/${role.role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(SignupData),
        });
        const data = await response.json()
        if (response.ok) {
            alert("account succesully create")
            console.log(data)
        }
        else {
            alert(data.error)
            console.log(data)
        }
    }

    return (





        < div className='w-1/3 m-auto mt-20' >
            {console.log(role)}
            <form onSubmit={handleSubmit} className="flex w-auto text-white border rounded-3xl p-5 bg-slate-600 flex-col">
                <label className="mb-5 text-1xl">
                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                    <input type="text" className="text-black ml-8 rounded-md" name="name" value={SignupData.name} onChange={handleChange} />
                </label>
                <label className="mb-5 text-1xl">
                    Email ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                    <input type="text" className="text-black ml-8 rounded-md" name="email" value={SignupData.email} onChange={handleChange} />
                </label>
                <label className="mb-5 text-1xl">
                    Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                    <input type="password" className="text-black ml-8 rounded-md" name="password" value={SignupData.password} onChange={handleChange} />
                </label>
                <div className='flex justify-center'>
                    <button className='rounded text-white border w-1/6' type="submit">submit</button>
                </div>
            </form>
        </div >

    )
}