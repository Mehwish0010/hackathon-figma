'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { useCounter } from '../../context/CartCounter'
import toast from 'react-hot-toast'
import { Star, StarHalf, Minus, Plus, Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  image: string // Updated to directly use the image URL as a string
  category: string
  price: number
  originalPrice?: number
  description: string
  badge?: {
    text: string
    color: string
  }
}

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('L')
  const [selectedColor, setSelectedColor] = useState('purple')
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { addToCart, getCartCount } = useCounter()

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`) // Adjust the API endpoint as needed
      const fetchedProduct: Product = await response.json()
      setProduct(fetchedProduct)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image, // Directly using the image URL
      })
      getCartCount()
      toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`, {
        style: {
          background: '#B88E2F',
          color: '#fff',
        },
      })
    }
  }

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="w-[90%] sm:w-[85%] max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-[40%] max-h-[31rem] bg-[#FFF9F3] rounded-lg p-3 sm:p-6 flex items-start justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6">{product.name}</h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 sm:mb-6">Rs. {product.price.toLocaleString()}.00</p>
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center text-yellow-400">
              <Star className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
              <StarHalf className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">5 Customer Review</span>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">{product.description}</p>
          {/* Size and color selection, quantity controls, and product meta go here */}
        </div>
      </div>
    </div>
  )
}
