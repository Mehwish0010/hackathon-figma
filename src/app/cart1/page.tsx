"use client"
import React, { useState, useEffect } from 'react'
import { Product } from '../../../types/products'
import Swal from 'sweetalert2'
import { getCartItems, removeFromCart, updateCartQuantity } from '../actions/actions'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { ChevronLeft, Trash2 } from 'lucide-react'

 import { useRouter } from 'next/navigation'

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCartItems(getCartItems())
    setLoading(false)
  }, [])

  const handleRemove = (productId: string) => {
    Swal.fire({
      title: 'Remove Item?',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B88E2F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId)
        setCartItems(getCartItems())
        Swal.fire('Removed!', 'Item has been removed from cart.', 'success')
      }
    })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return
    updateCartQuantity(id, quantity)
    setCartItems(getCartItems())
  }

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  }
const router = useRouter();
  const handleProceed = () => {
    Swal.fire({
      title: 'Proceed to Checkout?',
      text: 'Please review your cart before proceeding',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#B88E2F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Checkout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cart')
      Swal.fire('Success!', 'Your order has been processed!', 'success')
      router.push('/checkout')
        setCartItems([])

        
      }
    })
  }

  if (loading) return <div className="text-center py-20">Loading cart...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <Link href="/shop" className="bg-[#B88E2F] text-white px-6 py-3 rounded-md hover:bg-[#9c7629] transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="relative w-full md:w-40 h-40 bg-gray-50 rounded-lg">
                  <Image
                    src={item.productImage ? urlFor(item.productImage).url() : ''}
                    alt={item.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-6 border rounded-lg h-fit sticky top-8">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold">${calculatedTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${calculatedTotal().toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleProceed}
              className="w-full bg-[#B88E2F] text-white py-3 rounded-md hover:bg-[#9c7629] transition-colors"
            >
              Proceed to Checkout
            </button>

            <Link 
              href="/shop" 
              className="mt-4 flex items-center justify-center gap-2 text-[#B88E2F] hover:text-[#9c7629]"
            >
              <ChevronLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage