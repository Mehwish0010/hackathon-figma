
import React from "react";
import Image from "next/image";
import img1 from "@/components/assets/Mask Group(1).png";
import img2 from "@/components/assets/Image-living room.png";
import img3 from "@/components/assets/Mask Group(2).png";

const SectionBoxes = () => {
  return (
    <div className="w-full h-auto p-12">
      {/* Centered Heading */}
      <h2 className="text-center text-3xl font-bold mb-22">Browse The Range</h2>
      <p className="text-center text-md mt-2 ">Our most comforatble nad trendy furniture</p>

      {/* Boxes Container */}
      <div className="flex justify-between space-x-4 mt-10">
        {/* Box 1 */}
        <div className="w-[350px] h-[470px] flex flex-col items-center">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image src={img1} alt="Image 1" width={460} height={380} className="object-cover" />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Dinig</p>
        </div>

        {/* Box 2 */}
        <div className="w-[350px] h-[470px] flex flex-col items-center ">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image src={img2} alt="Image 2" width={460} height={380} className="object-cover" />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Living</p>
        </div>

        {/* Box 3 */}
        <div className="w-[350px] h-[470px] flex flex-col items-center">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <Image src={img3} alt="Image 3" width={460} height={380} className="object-cover" />
          </div>
          <p className="mt-4 text-center font-semibold text-gray-700">Bedroom</p>
        </div>
      </div>
    </div>
  );
};

export default SectionBoxes;
