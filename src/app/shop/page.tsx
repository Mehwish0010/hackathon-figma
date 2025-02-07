'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { full } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { addToCart } from '../actions/actions'
import Swal from 'sweetalert2'
import Pic from "@/components/assets/Rectangle 1.png"
import Logo from "@/components/assets/Meubel House_Logos-05.png"
import Logo2 from "@/components/assets/cup.png"
import Logo3 from "@/components/assets/shipping.png"
import Logo4 from "@/components/assets/customer-support.png"
const features = [
  {
    icon: Logo2,
    title: 'High Quality',
    description: 'crafted from top materials'
  },
  {
    icon: Logo3,
    title: 'Warranty Protection',
    description: 'Over 2 years'
  },
  {
    icon: Logo3,
    title: 'Free Shipping',
    description: 'Order over 150 $'
  },
  {
    icon: Logo4,
    title: '24 / 7 Support',
    description: 'Dedicated support'
  }
]
interface Product {
  _id: string;
  _type: 'product' | string;
  title: string;
  slug: { _type: 'slug'; current: string };
  productImage: { asset: { _ref: string; _type: 'reference' } };
  price: number;
  description: string;
  inventory: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(full)
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 2000
    })
    addToCart({ ...product, quantity: 1, _type: 'product' })
  }

  return (
    <div>
    <div className="relative h-[400px] w-full mb-10 mt-10">
      <Image
        src={Pic}
        alt="Comparison background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src={Logo}
          alt="Logo"
          width={70}
          height={70}
          quality={100}
          className="mb-0"
        />
        <h1 className="text-4xl font-semibold mb-4">Shop</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="hover:underline font-bold">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart1" className="hover:underline font-bold"> Cart</Link>
          <ChevronRight className="w-4 h-4 font-bold" />
          <span className='font-bold hover:underline'>Shop</span>
        </div>
      </div>
    </div>
    <section className="max-w-6xl mx-auto py-8">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <Link href={`/shop/${product.slug?.current || product._id}`}>
              {product.productImage?.asset && (
                <Image  
                  src={urlFor(product.productImage).url()} 
                  alt={product.title} 
                  width={300} 
                  height={300}
                  className='w-full h-48 object-cover rounded-md'
                />
              )}
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-500 font-semibold">${product.price}</p>
            </Link>
            <button
              className="mt-4 w-full bg-[#B88E2F] text-white px-4 py-2 rounded hover:bg-[#9c7629] transition"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
     <div className="w-full bg-[#FAF3EA] mx-auto px-4 py-16 mt-6 pl-6 lg:pl-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features.map((feature) => (
                <div 
                  key={feature.title} 
                  className="flex items-center gap-4 pl-8 md:pl-0"
                >
                  <div className="mb-4">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={60}
                      height={60}
                      quality={100}
                    />
                  </div>
                  <div className='flex flex-col'>
                  <h3 className="text-[#333333] text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#666666] text-base">
                    {feature.description}
                  </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}