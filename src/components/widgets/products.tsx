"use client";
import React, { use, useEffect, useState } from 'react'
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { allProducts, four, full } from '@/sanity/lib/queries';
import Image from 'next/image';
import { url } from 'inspector';
import { urlFor } from '@/sanity/lib/image';

const Products = () => {
  const [product, setProduct] = useState<Product[]>([])
  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts : Product[]= await client.fetch(full)
      setProduct(fetchedProducts)
    }
    fetchProducts()
  },[])
  return (
    <div className="text-myhover mb-[100px] mt-[100px] body-font">

<div className="text-center mb-10">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Our Products
        </h1>
        
       
</div>

{/*card*/}
<div className='max-w-6xl mx-auto px-4 py-8 '>
  
  <div className='grid grid-col-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
{product.map((product) => (
  <div key={product._id} className='border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200'>
  
  
    {product.productImage?.asset && (
      <Image  
        src={urlFor(product.productImage).url()} 
        alt={product.title || "Product"} 
        width={300} 
        height={300}
        className='w-full h-48 object-cover rounded-md'
      />
    )}
    <h1 className='text-lg font-semibold mt-4'>
      {product.title}</h1>
      <p className='text-gray-500 mt-2 font-semibold'>
       ${product.price}</p>

    </div>
))}
     </div>
    </div>
    </div>
  )
}

export default Products
