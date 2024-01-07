import React, { useState } from 'react'

export default function NewProduct() {

    const [product, setProduct] = useState({
        newProduct: 0,
        Name: "",
        category: "",
        Description: "",
        Price: 0
    })

    const handleChange = (e) => {
        if (e.target.name === "productID") {
            setProduct({
                ...product,
                productID: e.target.value,
            })
        }
        if (e.target.name === "Name") {
            setProduct({
                ...product,
                Name: e.target.value,
            })
        }

        if (e.target.name === "category") {
            setProduct({
                ...product,
                category: e.target.value,
            })
        }
        if (e.target.name === "Description") {
            setProduct({
                ...product,
                Description: e.target.value,
            })
        }
        if (e.target.name === "Price") {
            setProduct({
                ...product,
                Price: e.target.value,
            })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://salesmanagement.onrender.com/product", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json()
        if (response.ok) {
            alert("product successfully added")
        }
        else {
            alert(data.error)
        }
    }


    return (
        <div>
            <div className='h-[100vh] W-100 mb-8'>
                <div className='w-1/3 m-auto mt-20'>
                    <form className="flex w-auto text-white border rounded-3xl p-5 bg-slate-600 flex-col">
                        <label className="mb-5 text-1xl">
                            productID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="number" className="text-black ml-8 rounded-md" name="productID" value={product.productID} onChange={handleChange} />
                        </label>
                        <label className="mb-5 text-1xl">
                            Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="text" className="text-black ml-8 rounded-md" name="Name" value={product.Name} onChange={handleChange} />
                        </label>
                        <label className="mb-5 text-1xl">
                            category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="text" className="text-black ml-8 rounded-md" name="category" value={product.category} onChange={handleChange} />
                        </label>
                        <label className="mb-5 text-1xl">
                            Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="text" className="text-black ml-8 rounded-md" name="Description" value={product.Description} onChange={handleChange} />
                        </label>
                        <label className="mb-5 text-1xl">
                            Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-
                            <input type="number" className="text-black ml-8 rounded-md" name="Price" value={product.Price} onChange={handleChange} />
                        </label>
                        <div className='flex justify-center'>
                            <button onClick={handleSubmit} className='rounded text-white border w-1/6' type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
