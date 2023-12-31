import React, { useEffect, useState } from 'react'
import Product from './Product'

export default function ProductList() {

    const [products, setProducts] = useState([{}])


    const getPruducts = async () => {
        const response = await fetch('https://salesmanagement.onrender.com/product', {
            method: 'GET'
        })
        const data = await response.json()
        if (response.ok) {
            setProducts(data)
        }
    }
    useEffect(() => {
        getPruducts()
    })

    const largeOrder = () => {
        if (products.length > 2) {
            document.getElementById("product").style.height = "auto"

        }
    }
    return (
        <div className='h-[100vh] bg-slate-700 pb-20' id="product">

            {products &&
                products.map((product, index) => {
                    return (<Product product={product} key={index} />)
                })

            }
            {largeOrder()
            }



        </div>
    )
}
