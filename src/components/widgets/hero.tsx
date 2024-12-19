import React from "react";
import Pic from "@/components/assets/scandinavian-interior-mockup-wall-decal-background 1.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      <Image 
        src={Pic} 
        alt="poster" 
        layout="fill" 
        objectFit="cover" 
        objectPosition="center" 
        className="absolute inset-0"
      />
      
      {/* Content Box on the Right */}
      <div className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 bg-box-hero p-4 md:p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[543px] h-auto">
        <p className="text-black text-sm sm:text-base md:text-lg">Welcome to Our Platform</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-box-write mt-2 sm:mt-4">
          Discover Our New Collection
        </h1>
        <p className="text-gray-700 mt-2 sm:mt-4 text-sm sm:text-base">
          Join us to explore amazing opportunities and grow your skills with
          top-notch resources.
        </p>
        <button className="mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-box-write text-white rounded-md hover:bg-blue-600 transition-all duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
