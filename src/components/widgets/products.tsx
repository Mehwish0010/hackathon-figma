import React from 'react'

import Pic from "@/components/assets/image 1.png"
import Pic2 from"@/components/assets/image 2(1).png"
import Pic3 from "@/components/assets/image 3.png"
import Best_Seller_Box from '@/components/widgets/box'
const Products = () => {
  const best_Sell=[
    {id:1,
      src: Pic,
      alt: "furniture",
      title: "Syltherine",
      description: "Stylish cafe Chair",
      price:2500.000,
  },
  {id:2,
    src: Pic2,
    alt: "shoes",
    title: "Formal Court Shoes IF5005-GREEN",
    description: "Top Notch shoes for women",
    price:5000
}
,{id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },{id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },
  {id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },
  {id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },
  {id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },
  {id:4,
    src: Pic3,
    alt: "dress",
    title: "Kidz Wear",
    description: "Printed Khaddar Shirt",
    price:2250
    
  },
    
];

  return (
    <div className="text-myhover mb-[100px] mt-[100px] body-font">

<div className="text-center mb-10">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Our Products
        </h1>
        
       
</div>

{/*card*/}
<div className=' flex flex-wrap justify-center gap-5 p-2 ml-2 '>
{
  best_Sell.map((item) =>(
    <Best_Seller_Box key={item.id} src={ item.src} alt={item.alt}  title={item.title}  description={item.description} price={item.price}/>
  ))
}
</div>
<div className="flex justify-center mt-10">
        <button className="px-20 py-2 border-box-write border-2 text-box-write font-bold rounded hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>

    </div>
  )
}

export default Products