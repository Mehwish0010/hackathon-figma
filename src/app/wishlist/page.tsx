'use client'

import Image from 'next/image'
import Link from 'next/link'

const wishlistItems = [
  {
    id: 1,
    name: 'Asgaard Sofa',
    price: 'Rs. 250,000.00',
    image: '/images/asgaard-sofa.png',
  },
  {
    id: 2,
    name: 'Oak Coffee Table',
    price: 'Rs. 85,000.00',
    image: '/images/oak-coffee-table.png',
  },
]

export default function Wishlist() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-poppins">
      <h1 className="text-3xl font-semibold mb-6">Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-lg p-4 flex flex-col items-center space-y-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="object-cover rounded"
              />
              <h3 className="text-lg font-medium">{item.name}</h3>
              <span className="text-sm text-gray-700">{item.price}</span>
              <Link
                href={`/product/${item.id}`}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                View Details
              </Link>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
