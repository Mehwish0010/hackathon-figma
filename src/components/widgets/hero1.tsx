import React from "react";
import Pic from "@/components/assets/scandinavian-interior-mockup-wall-decal-background 1.png"
import Image from "next/image";
const HeroSection = () => {
  return (
    <div className="w-[1300px] ml-10 h-[600px] relative overflow-hidden">
    <Image 
      src={Pic} 
      alt="poster" 
      layout="fill" 
      objectFit="cover" 
      objectPosition="center"
      className=""
    />
   
    
      {/* Content Box on the Right */}
      <div className=" mr-10 absolute top-1/2 p-6 mt-20 bg-box-hero right-12 transform -translate-y-1/2 w-[543px] h-[343px]  rounded-lg shadow-lg">
        <p className="text-black text-lg">Welcome to Our Platform</p>
        <h1 className="text-4xl font-extrabold text-box-write mt-4">Discover Our New Collection</h1>
        <p className="text-gray-700 mt-4">
          Join us to explore amazing opportunities and grow your skills with
          top-notch resources.
        </p>
        <button className="mt-6 px-6 py-3 bg-box-write text-white rounded-md hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

