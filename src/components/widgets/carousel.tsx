"use client"
import React, { useState } from "react";
import Image from "next/image";
import Pic from "@/components/assets/Rectangle 24.png"

const SectionWithThreeDivs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/image 1.png", // Replace with actual image paths
    "/image 2.png",
    "/image 3.png",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="flex gap-4 p-10 bg-carousel h-[500px]">
      {/* First Div */}
      <div className="flex flex-col items-center justify-center w-1/3 bg-carousel  rounded-xl text-center">
        <h2 className="text-2xl font-extrabold text-gray-800">50+ Beautiful rooms<br/> <span  className="mr-28">inspiration</span></h2>
        <p className="mt-4 text-box-write text-sm ml-12">
   Our designer already made a alot of beautiful prototipe of rooms that inspire you.
        </p>
        <button className="px-8 mr-28 py-2 mt-6 text-white bg-box-write rounded hover:bg-slate-400">
          Explore More
        </button>
      </div>

      {/* Second Div */}
      <div className="relative w-1/3 bg-gray-300 shadow-md rounded-lg overflow-hidden">
        <Image
          src={Pic}
          alt="Main image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {/* Small Box */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-60 shadow-md rounded py-4 px-10 mt-64 ">
          <h3 className="text-sm font-medium ml-6 mt-6 text-gray-800">01  Bed Room
          </h3>
          <h2 className="text-3xl text-extrabold mt-2 ">Inner Peace</h2>
        </div>
      </div>

      {/* Third Div */}
      <div className="w-1/3">
        <div className="relative h-[75%] bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-center">
          {/* Carousel */}
          <Image
            src={images[currentIndex]}
            alt={`Carousel Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Carousel Controls */}
          <button
            className="absolute left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="absolute right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-75"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionWithThreeDivs;
