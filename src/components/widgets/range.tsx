
import React from "react";
import Image from "next/image";
import img1 from "@/components/assets/Mask Group(1).png";
import img2 from "@/components/assets/Image-living room.png";
import img3 from "@/components/assets/Mask Group(2).png";

const SectionBoxes = () => {
  return (
    <div className="w-full h-auto p-6 sm:p-12">
      {/* Centered Heading */}
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">Browse The Range</h2>
      <p className="text-center text-sm sm:text-md mt-2">
        Our most comfortable and trendy furniture
      </p>

      {/* Boxes Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Box 1 */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image
              src={img1}
              alt="Dining"
              width={460}
              height={380}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Dining</p>
        </div>

        {/* Box 2 */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image
              src={img2}
              alt="Living"
              width={460}
              height={380}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Living</p>
        </div>

        {/* Box 3 */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image
              src={img3}
              alt="Bedroom"
              width={460}
              height={380}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Bedroom</p>
        </div>
      </div>
    </div>
  );
};

export default SectionBoxes;
