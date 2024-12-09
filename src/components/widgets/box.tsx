import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Image, { StaticImageData } from 'next/image';

const Best_Seller_Box= ({src,alt,title,description,price  }:{src:string | StaticImageData,  alt:string ,title:string,description:string,price:number}) => {
  return (
    <div className="bg-bg-box w-[250px] h-[150]   shadow-md  relative group">
 <div className='block relative h-[24rem] rounded overflow-hidden'>
  <Image
  src={src}
  alt={alt}
  height={600}
  width={400}
  /> 
 
 </div>
  <div className="h-[100]">
    <h2 className="text-black scroll-m-2  pb-2  text-base font-semibold tracking-wide ml-6 first:mt-0">{title}</h2>
  <p className="  font-mediumbold text-sm-base tracking-tight first:mt-0 ml-6">{description}</p>
  <p className="  mt-2 pb-2  font-bold tracking-tight text-lg-base first:mt-0 ml-6">PKR {price}</p>
  
  </div>

</div>

  )
}

export default Best_Seller_Box
