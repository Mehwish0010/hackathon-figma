import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';
import Pic from "@/components/assets/Meubel House_Logos-05.png"
import { IoIosSearch } from "react-icons/io";
import Pic1 from "@/components/assets/Vector.png"

const Navbar = () => {
  return (
    <div className="navbar p-5  shadow-md flex items-center justify-between">
      {/* First Div: Logo */}
      <div className="flex mt-6 gap-1 ml-12">
        <Image src={Pic} alt=""  height={30} width={30}/>
        <h4 className="font-bold text-2xl">Furniro</h4>


      </div>

      {/* Second Div: Links */}
      <div className="hidden md:flex gap-12 mt-6 mr-14">
        <a href="/" className="text-black font-medium text-md ">Home</a>
        <a href="/shop" className="text-black font-medium">Shop</a>
        <a href="/contact" className="text-black font-medium">Contact</a>
        <a href="#" className="text-black font-medium">Blog</a>
      </div>

  
      {/* Fourth Div: Cart and Wishlist Icons */}
      <div className="flex  gap-7 mr-16 mt-6">

       <button className="btn  btn-ghost">
         <Image src={Pic1} alt="logo" height={20} width={20}/>
        </button>

        <button className="btn  btn-ghost">
         <IoIosSearch  size={20}/>
        </button>
        
      <button className="btn  btn-ghost">
         <CiHeart size={20}/>
        </button>
        {/* Cart Icon */}


        <button className="btn btn-ghost">
        <IoCartOutline  size={20} />
        </button>
        {/* Wishlist Icon */}
        
      </div>
    </div>
  );
};

export default Navbar;
