
import React from 'react';
import Image from 'next/image';
import Vase from "@/components/assets/Rectangle 39.png";
import Chair from "@/components/assets/Rectangle 37.png";
import Kitchen from "@/components/assets/Rectangle 44.png";
import Dinning from "@/components/assets/Rectangle 45.png";
import Vases from "@/components/assets/Rectangle 36.png";
import Laptop from "@/components/assets/laptopblog.png";
import Bed from "@/components/assets/Rectangle 43.png";
import Frame from "@/components/assets/Rectangle 41.png";

const galleryImages = [
  { id: '1', src: Vase, alt: 'Modern shelf setup with plants', width: 280, height: 500, className: 'lg:block hidden col-span-1 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3' },
  { id: '2', src: Laptop, alt: 'Minimalist workspace setup', width: 450, height: 300, className: 'col-span-1 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-2' },
  { id: '3', src: Chair, alt: 'Vintage brown chair', width: 280, height: 400, className: 'col-span-1 lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3' },
  { id: '4', src: Dinning, alt: 'Small table with vase', width: 280, height: 280, className: 'col-span-1 lg:col-start-5 lg:col-end-6 lg:row-start-2 lg:row-end-3' },
  { id: '5', src: Vases, alt: 'Modern dining room', width: 400, height: 600, className: 'col-span-1 lg:col-start-6 lg:col-end-9 lg:row-start-1 lg:row-end-4' },
  { id: '6', src: Bed, alt: 'Contemporary bedroom setup', width: 450, height: 350, className: 'col-span-1 lg:col-start-9 lg:col-end-12 lg:row-start-1 lg:row-end-2' },
  { id: '7', src: Kitchen, alt: 'Modern kitchen counter', width: 280, height: 280, className: 'col-span-1 lg:col-start-12 lg:col-end-14 lg:row-start-1 lg:row-end-2' },
  { id: '8', src: Frame, alt: 'Decorative wall art', width: 280, height: 280, className: 'col-span-1 lg:col-start-9 lg:col-end-11 lg:row-start-2 lg:row-end-3' },
  { id: '9', src: Vase, alt: 'Wall mounted shelf', width: 280, height: 280, className: 'col-span-1 lg:col-start-12 lg:col-end-14 lg:row-start-2 lg:row-end-3' }
];

export default function Furniture() {
  return (
    <section className="w-full py-16 md:py-24 px-4 font-poppins overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#3A3A3A] text-2xl md:text-3xl font-medium mb-2">
            Share your setup with
          </h2>
          <p className="text-[#616161] text-3xl md:text-4xl font-bold">
            #FuniroFurniture
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-13 grid-rows-3 gap-4 h-[800px]">
          {galleryImages.map((image) => (
            <div key={image.id} className={`${image.className} overflow-hidden`}>
              <Image
                src={image.src} // Use the imported image
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={100}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className={`${image.className} overflow-hidden`}>
              <Image
                src={image.src} // Use the imported image
                alt={image.alt}
                width={image.width}
                height={image.height}
                quality={100}
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
