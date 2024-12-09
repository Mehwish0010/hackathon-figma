import React from 'react'
import Image from 'next/image'
import Poster from "@/components/assets/hero_endframe__cvklg0xk3w6e_large 2.png"
import Apple from "@/components/assets/1200px-Apple_gray_logo 1.png"

const Hero = () => {
  return (
    <div>  <section className="flex flex-col md:flex-row items-center justify-between w-[892] h-[344] bg-black p-4 md:p-22">
    {/* Left Section: Text */}
    <div className="flex-1 mb-6 md:mb-0 md:pr-8 h-[120] w-[294] ml-40   ">
    <div className="flex items-center space-x-4">
  <Image src={Apple} alt="logo" height={49} width={40} className='mb-7 mr-3' />
  <p className="text-lg text-white mb-6 ml-8">iPhone 14 Series</p>
</div>
      <h1 className="text-6xl md:text-5xl font-bold h-[120] w-[294] text-white  leading-loose  tracking-wider mb-4">
        Up to 10% <br/> off Voucher 
      </h1>
     
     <button className='w-[113] h-[28] bg-black text-white underline sapce-x-2'>
Shop Now
     </button>
    </div>

    {/* Right Section: Image */}
    <div className="flex-1 flex justify-center mr-26 h-[352] w-[496]">
      <Image
        src={Poster}
        alt="Hero Image"
        width={700}
        height={400}
        className="rounded-lg shadow-lg "
      />
    </div>
  </section></div>
  )
}
  

export default Hero