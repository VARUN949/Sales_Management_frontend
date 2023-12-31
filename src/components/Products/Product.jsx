import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import MyContext from '../../Context/MyContex'

export default function Product({ product }) {


    const [quantity, setQuantity] = useState(0)
    const { setBuyProduct } = useContext(MyContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleBuy = () => {
        setBuyProduct({
            product: product,
            quantity: parseInt(quantity)
        })
        navigate('/billing')
    }

    return (
        <div>
            {product &&
                <div className=" border h-auto mt-24 m-auto w-100 mb-30 bg-slate-400 w-1/3 rounded">
                    <div className='flex m-4'>
                        <p>Pruduct ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product.productID}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Name &nbsp;&nbsp;&nbsp; :-&nbsp;&nbsp;</p>
                        <p>{product.Name}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Description &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product.Description}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>category&nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product.category}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Price &nbsp;:-&nbsp;&nbsp;</p>
                        <p>{product.Price}</p>
                    </div>
                    <div className='flex m-4'>
                        <p>Quantity &nbsp;:-&nbsp;&nbsp;</p>
                        <input type='number' onChange={handleChange} value={quantity} className='w-10 rounded-md'></input>
                    </div>
                    <div className='flex m-4'>
                        <button className='rounded-md w-20 text-white border bg-slate-700' onClick={handleBuy}>Buy</button>
                    </div>
                </div>
            }
        </div>
    )
}