"use client"
import React, { useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';
import Pic from "@/components/assets/Meubel House_Logos-05.png";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Pic1 from "@/components/assets/Vector.png";
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar p-5 shadow-md flex items-center justify-between relative">
      {/* First Div: Logo */}
      <div className="flex mt-6 gap-1 ml-12">
        <Image src={Pic} alt="logo" height={30} width={30} />
        <h4 className="font-bold text-2xl">Furniro</h4>
      </div>

      {/* Second Div: Links */}
      <div className="hidden md:flex gap-12 mt-6 mr-14">
        <Link href="/" className="text-black font-medium text-md">Home</Link>
        <Link href="/shop" className="text-black font-medium">Shop</Link>
        <Link href="/contact" className="text-black font-medium">Contact</Link>
        <Link href="/blog" className="text-black font-medium">Blog</Link>
      </div>

      {/* Fourth Div: Cart and Wishlist Icons */}
      <div className="flex gap-7 mr-16 mt-6">
        <Link href="/checkout">
          <button className="btn btn-ghost">
            <Image src={Pic1} alt="logo" height={20} width={20} />
          </button>
        </Link>
        <button className="btn btn-ghost">
          <IoIosSearch size={20} />
        </button>
        <button className="btn btn-ghost">
          <CiHeart size={20} />
        </button>
        <button className="btn btn-ghost">
          <IoCartOutline size={20} />
        </button>

        {/* Hamburger Icon */}
        <button
          className="text-black text-xl md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link href="/" className="text-black font-medium" onClick={toggleMenu}>Home</Link>
            <Link href="/shop" className="text-black font-medium" onClick={toggleMenu}>Shop</Link>
            <Link href="/contact" className="text-black font-medium" onClick={toggleMenu}>Contact</Link>
            <Link href="/blog" className="text-black font-medium" onClick={toggleMenu}>Blog</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

