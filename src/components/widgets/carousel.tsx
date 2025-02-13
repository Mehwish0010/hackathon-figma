"use client";
import React, { useState } from "react";
import Image from "next/image";
import Pic from "@/components/assets/Rectangle 24.png";
import Link from "next/link";

const SectionWithThreeDivs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/assets/Rectangle%2024.png",
    "/assets/image%201.png",
    "/assets/image%202(1).png",
    "/assets/image%203.png",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-6 p-6 bg-carousel h-auto">
      {/* First Div */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-carousel rounded-xl text-center p-6">
        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-800">
          50+ Beautiful rooms <br />
          <span>inspiration</span>
        </h2>
        <p className="mt-4 text-box-write text-sm lg:text-base">
          Our designers have already created many beautiful prototypes of rooms
          to inspire you.
        </p>
        <Link href="/shop">
        <button className="px-6 py-2 mt-6 text-white bg-box-write rounded hover:bg-slate-400">
          Explore More
        </button>
        </Link>
      </div>

      {/* Second Div */}
      <div className="relative w-full lg:w-1/3 bg-gray-300 shadow-md rounded-lg overflow-hidden">
        <Image
          src={Pic}
          alt="Main image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {/* Small Box */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 shadow-md rounded py-4 px-6">
          <h3 className="text-sm font-medium text-gray-800">01 Bedroom</h3>
          <h2 className="text-2xl font-bold text-gray-900">Inner Peace</h2>
        </div>
      </div>

      {/* Third Div */}
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <div className="relative h-64 lg:h-[75%] bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-center">
          {/* Carousel */}
          <Image
            src={images[currentIndex]}
            alt={`Carousel Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-black"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-box-write text-white rounded hover:bg-slate-400"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-box-write text-white rounded hover:bg-slate-400"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionWithThreeDivs;

