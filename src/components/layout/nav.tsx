"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartMenu from "../widgets/CartMenu";
import SearchModal from "../widgets/searchModal";
import { CounterContext } from "../../app/context/CartCounter";
import WishlistMenu from "../widgets/wishlist";
import { useWishlist } from "../../app/context/WishlistContext";
import Pic from "@/components/assets/Meubel House_Logos-05.png";
import Pic2 from "@/components/assets/Vector.png";
import Pic3 from "@/components/assets/akar-icons_search.png";  
import Pic4 from "@/components/assets/akar-icons_heart.png";
import { FiShoppingCart } from "react-icons/fi"
import { IoCartOutline } from "react-icons/io5"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import Pic5 from "@/components/assets/ant-design_shopping-cart-outlined.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isWishlistMenuOpen, setIsWishlistMenuOpen] = useState<boolean>(false);
  const counter = useContext(CounterContext);
  const wishlist = useWishlist();

  const toggleCartMenu = () => {
    setIsCartMenuOpen((prev) => !prev);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  const toggleWishlistMenu = () => {
    setIsWishlistMenuOpen((prev) => !prev);
  };

  return (
    <div>
    <nav className="bg-white shadow-md font-poppins relative ">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
        {/* First Div: Logo */}
    <div className="flex mt-6 gap-1 ml-12 mb-6">
      <Image src={Pic} alt="logo" height={10} width={35} />
      <h4 className="font-bold text-2xl">Furniro</h4>
    </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center sm:space-x-8">
            <Link href="/" className="text-gray-800 font-bold hover:text-gray-600 px-3 py-2 text-base font-poppinsSemiBold">
              Home
            </Link>
            <Link href="/shop" className="text-gray-800 font-bold hover:text-gray-600 px-3 py-2 text-base font-poppinsSemiBold">
              Shop
            </Link>
            <Link href="/blog" className="text-gray-800 font-bold hover:text-gray-600 px-3 py-2 text-base font-poppinsSemiBold">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-800 font-bold hover:text-gray-600 px-3 py-2 text-base font-poppinsSemiBold">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex md:items-center sm:space-x-9">
            <Link href="/checkout" className="text-gray-800 hover:text-gray-600">
              <Image src={Pic2} alt="Account" width={22} height={22} quality={100} />
            </Link>
            <button
                onClick={toggleSearchModal}
                className="text-gray-800 hover:text-gray-600">
                  
    <Image src={Pic3} alt="Search" width={22} height={22} quality={100} />
  </button>

            <Link href="/wishlist" className="text-gray-800 hover:text-gray-600">
              <Image src={Pic4} alt="Favorites" width={22} height={22} quality={100} />
            </Link>
            {/* Cart Icon */}
            <Link href="/cart1">
          <button
            className="text-gray-800 hover:text-gray-600 relative"
            onClick={toggleCartMenu}
          >
            <Image src={Pic5} alt="Favorites" width={22} height={22} quality={100} />
            {counter?.cartCount !== null && counter?.cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {counter?.cartCount ?? 0}
              </span>
            )}
          </button>
          </Link>
          </div>




          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'absolute ' : 'hidden'
        } pt-12 md:hidden top-0 bg-white z-40 h-[100vh] w-[80%]`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white " onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/blog" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          <div className='pl-2 pt-3 flex gap-4'>
          <Link href="#" className="text-gray-800 hover:text-gray-600">
              <Image src="/images/heart-icon.png" alt="Favorites" width={22} height={22} quality={100} />
            </Link>
            
            <div className="relative">   <Link href="/cart1" className="hover:underline font-bold"><button className="btn btn-ghost">
        <IoCartOutline size={20} />
      </button>
      </Link>

      {/* Hamburger Icon */}
      <button
        className="text-black text-xl md:hidden"
        onClick={toggleCartMenu}
      >
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </div>

    {/* Dropdown Menu */}
    {isMenuOpen && (
      <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
        <div className="flex flex-col items-center gap-4 py-4">
          <Link href="/" className="text-black font-medium" onClick={toggleCartMenu}>Home</Link>
          <Link href="/shop" className="text-black font-medium" onClick={toggleCartMenu}>Shop</Link>
          <Link href="/contact" className="text-black font-medium" onClick={toggleCartMenu}>Contact</Link>
          <Link href="/blog" className="text-black font-medium" onClick={toggleCartMenu}>Blog</Link>
        </div>
      </div>
    )}
          </div>
        </div>
      </div>
    </nav>
    {isCartMenuOpen && <CartMenu onClose={() => setIsCartMenuOpen(false)} />}
  </div>
);
};