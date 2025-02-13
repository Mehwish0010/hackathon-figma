
"use client"
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../../types/products";
import Pic from "@/components/assets/insta.png"
import Pic1 from "@/components/assets/facebook.jpeg"
import Pic2 from "@/components/assets/twi.png"
// -------------------
// Server Component
// -------------------

// Fetch product by _id instead of slug
async function getProductById(id: string | undefined): Promise<Product | null> {
  if (!id) return null; // Prevent undefined ID error
  const query = `*[_type == "product" && _id == $id][0]{
    _id, title, description, price, productImage, inventory, discountPercentage
  }`;
  return await client.fetch(query, { id });
}

export default async function ProductPage({ params }: { params: { id?: string } }) {
  if (!params.id) return notFound();
  const product = await getProductById(params.id);
  if (!product) return notFound();

  // Pass the fetched product to the interactive (client) component.
  return <ProductDetails product={product} />;
}

// -------------------
// Client Component
// -------------------

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Share2,
  BarChart2,
  Heart,
} from "lucide-react";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";

function ProductDetails({ product }: { product: Product }) {
  // Get the product image URL from Sanity
  const imageUrl = product.productImage ? urlFor(product.productImage).url() : '';
  // For demonstration, duplicate the main image as thumbnails.
  const thumbnails = [imageUrl, imageUrl, imageUrl];

  // State for interactive UI elements
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Ref and scroll function for the related products slider
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

// Dummy related products data
const relatedProducts = [
  {
    id: 1,
    image: "/images/related1.png",
    name: "Sofa 1",
    category: "Sofas",
    price: 250000,
    originalPrice: 300000,
    badge: { text: "New", color: "bg-red-500" },
  },
  {
    id: 2,
    image: "/images/related2.png",
    name: "Sofa 2",
    category: "Sofas",
    price: 200000,
    originalPrice: null,
    badge: null,
  },
  // Add more related products as needed
];

// Function to handle adding product to cart
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
    <>
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-4">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(thumb)}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 transition-all"
                >
                  <Image
                    src={thumb}
                    alt={`Product thumbnail ${index + 1}`}
                    width={50}
                    height={50}
                    quality={100}
                    className="object-cover bg-cream"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square">
              <Image
                src={selectedImage}
                alt="Product main image"
                width={500}
                height={300}
                quality={100}
                className="object-contain bg-cream mt-8"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 mt-8">
            <h1 className="text-5xl font-medium">{product.title}</h1>
            <div className="text-2xl">Rs. {product.price.toLocaleString()}</div>

            {/* Rating (static 4-star example) */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id="half">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#half)"
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-500">5 Customer Review</span>
            </div>

            {/* Description */}
            <p className="text-xs lg:text-base text-gray-600 line-clamp-5">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="block text-sm">Size</label>
              <div className="flex gap-2">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center border rounded ${
                      selectedSize === size
                        ? "bg-brown text-white"
                        : "bg-cream border-none"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="block text-sm">Color</label>
              <div className="flex gap-2">
                {[
                  { name: "purple", class: "bg-purple-500" },
                  { name: "black", class: "bg-black" },
                  { name: "gold", class: "bg-yellow-700" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-5">
              <div className="flex items-center border border-gray bg-black rounded  lg:py-1 text-white text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-[#B88E2F] hover:bg-gray-100 lg:text-base text-xs"
                >
                  <Minus className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <span className="w-6 lg:w-12 text-center lg:text-base text-xs">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 lg:text-base text-xs"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
              <button
              className=" w-40 bg-[#B88E2F] text-white px-4 py-2 rounded hover:bg-[#9c7629] transition"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to cart
            </button>
              <button className="px-4  bg-black text-white lg:px-5 text-[0.6rem] lg:text-base border border-gray rounded py-3">
                + Compare
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-4 pt-6 border-t text-sm text-gray-700">
              <div className="flex">
                <span className="w-24 text-[#9F9F9F]">SKU</span>
                <span className="text-[#9F9F9F]">: SS001</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[#9F9F9F]">Category</span>
                <span className="text-[#9F9F9F]">: Sofas</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[#9F9F9F]">Tags</span>
                <span className="text-[#9F9F9F]">
                  : Sofa, Chair, Home, Shop
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-[#9F9F9F]">Share</span>
                <div className="flex gap-4">
                  <button className="hover:text-gray-600">
                    <Image
                      src={ Pic}
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                  </button>
                  <button className="hover:text-gray-600">
                    <Image
                      src={Pic1}
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </button>
                  <button className="hover:text-gray-600">
                    <Image
                      src={Pic2}
                      alt="Twitter"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   

          <div className="relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-4 px-[16px] sm:px-0"
            >
              {relatedProducts.map((prod) => (
                <div key={prod.id} className="group flex-shrink-0 w-[280px] sm:w-auto">
                  <div className="relative bg-[#F4F5F7] rounded-sm overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      width={285}
                      height={301}
                      quality={100}
                      className="w-full h-[301px] object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button className="w-52 bg-white text-[#B88E2F] px-10 py-3 rounded-sm hover:bg-[#B88E2F] hover:text-white transition-colors duration-300">
                          Add to cart
                        </button>
                      </div>
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white">
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <BarChart2 className="w-5 h-5" />
                          Compare
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <Heart className="w-5 h-5" />
                          Like
                        </button>
                      </div>
                    </div>

                    {/* Badge */}
                    {prod.badge && (
                      <div
                        className={`absolute top-5 right-5 ${prod.badge.color} text-white text-sm font-bold px-4 py-1 rounded-sm`}
                      >
                        {prod.badge.text}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-[#3A3A3A] text-2xl font-semibold mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-[#898989] mb-2">{prod.category}</p>
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-[#B88E2F] font-semibold">
                        Rp {prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-[#B0B0B0] line-through">
                          Rp {prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chevron buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md sm:hidden"
              style={{ left: "-16px" }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md sm:hidden"
              style={{ right: "-16px" }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop">
            <button className="border-3 border-[#B88E2F] text-[#B88E2F] px-8 py-3 hover:bg-[#B88E2F] hover:text-white transition-colors duration-300">
              Show More
            </button>
            </Link>
          </div>
        
      
    
    </>
  );
}

