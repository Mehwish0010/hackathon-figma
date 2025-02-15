"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CounterContext } from "../../app/context/CartCounter";
import { useWishlist } from "../../app/context/WishlistContext";
import Pic from "@/components/assets/Meubel House_Logos-05.png";
import Pic2 from "@/components/assets/Vector.png";
import Pic3 from "@/components/assets/akar-icons_search.png";
import Pic4 from "@/components/assets/akar-icons_heart.png";
import Pic5 from "@/components/assets/ant-design_shopping-cart-outlined.png";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ChatBot from '@/components/ChatBot'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const counter = useContext(CounterContext);
  const wishlist = useWishlist();

  return (
    <>
      <nav className="bg-white shadow-md font-poppins relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex mt-6 gap-1 ml-12 mb-6">
              <Image src={Pic} alt="logo" height={10} width={35} />
              <h4 className="font-bold text-2xl">Furniro</h4>
            </div>

            <div className="hidden md:flex md:items-center sm:space-x-16">
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
              <Link href="/checkout">
                <Image src={Pic2} alt="Account" width={22} height={22} />
              </Link>
              <Link href="/search">
                <Image src={Pic3} alt="Search" width={22} height={22} />
              </Link>
              <Link href="/wishlist">
                <Image src={Pic4} alt="Favorites" width={22} height={22} />
              </Link>
              <Link href="/cart1" className="relative">
                <Image src={Pic5} alt="Cart" width={22} height={22} />
                {counter?.cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {counter?.cartCount ?? 0}
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 hover:text-gray-600 focus:outline-none"
              >
                {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-[80%] h-[100vh] bg-white shadow-md z-50 p-5">
            <button
              className="absolute top-5 right-5 text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="flex flex-col space-y-4 mt-10">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="flex gap-4 pt-4">
                <Link href="/checkout">
                  <Image src={Pic2} alt="Account" width={22} height={22} />
                </Link>
                <Link href="/search">
                  <Image src={Pic3} alt="Search" width={22} height={22} />
                </Link>
                <Link href="/wishlist">
                  <Image src={Pic4} alt="Favorites" width={22} height={22} />
                </Link>
                <Link href="/cart1" className="relative">
                  <IoCartOutline size={24} />
                  {counter?.cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {counter?.cartCount ?? 0}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <ChatBot />
    </>
  );
}

