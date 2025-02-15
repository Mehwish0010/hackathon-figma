'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Vase from "@/components/assets/Rectangle 39.png";
import Chair from "@/components/assets/Rectangle 37.png";
import Kitchen from "@/components/assets/Rectangle 44.png";
import Dinning from "@/components/assets/Rectangle 45.png";
import Vases from "@/components/assets/Rectangle 36.png";
import Laptop from "@/components/assets/laptopblog.png";
import Bed from "@/components/assets/Rectangle 43.png";
import Frame from "@/components/assets/Rectangle 41.png";

const galleryImages = [
  { 
    id: '1', 
    src: Vase, 
    alt: 'Modern shelf setup with plants', 
    gridClass: 'col-span-2 row-span-2'
  },
  { 
    id: '2', 
    src: Laptop, 
    alt: 'Minimalist workspace setup', 
    gridClass: 'col-span-2 row-span-1'
  },
  { 
    id: '3', 
    src: Chair, 
    alt: 'Vintage brown chair', 
    gridClass: 'col-span-2 row-span-1'
  },
  { 
    id: '4', 
    src: Dinning, 
    alt: 'Small table with vase', 
    gridClass: 'col-span-2 row-span-2'
  },
  { 
    id: '5', 
    src: Vases, 
    alt: 'Modern dining room', 
    gridClass: 'col-span-2 row-span-1'
  },
  { 
    id: '6', 
    src: Bed, 
    alt: 'Contemporary bedroom setup', 
    gridClass: 'col-span-2 row-span-1'
  },
  { 
    id: '7', 
    src: Kitchen, 
    alt: 'Modern kitchen counter', 
    gridClass: 'col-span-2 row-span-2'
  },
  { 
    id: '8', 
    src: Frame, 
    alt: 'Decorative wall art', 
    gridClass: 'col-span-2 row-span-2'
  }
];

export default function Pictures() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Gallery</h2>
        <p className="text-gray-600">Explore our furniture collection</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-8 bg-white rounded-xl shadow-2xl"
      >
        {/* Decorative frame elements */}
        <div className="absolute inset-0 border-[12px] border-[#B88E2F]/10 rounded-xl" />
        <div className="absolute inset-4 border-[2px] border-[#B88E2F]/20 rounded-lg" />
        
        {/* Main grid container */}
        <div className="grid grid-cols-6 gap-4 relative z-10 p-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg ${image.gridClass}`}
            >
              <div className="group relative w-full h-full min-h-[200px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="bg-white/90 px-4 py-2 rounded-full text-[#B88E2F] font-medium text-sm"
                  >
                    {image.alt}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#B88E2F]/30 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#B88E2F]/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#B88E2F]/30 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#B88E2F]/30 rounded-br-lg" />
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute -z-10 top-1/2 left-0 w-72 h-72 bg-[#B88E2F]/5 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-0 right-0 w-96 h-96 bg-[#B88E2F]/5 rounded-full blur-3xl" />
    </section>
  );
}
