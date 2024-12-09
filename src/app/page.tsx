import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/nav";
import SectionWithThreeDivs from "@/components/widgets/carousel";

import HeroSection from "@/components/widgets/hero1";
import Pictures from "@/components/widgets/pictures";


import Products from "@/components/widgets/products";
import SectionBoxes from "@/components/widgets/range";
import Image from "next/image";

export default function Home() {
  return (
    <>
    
    <Navbar/>
    <HeroSection/>
    <SectionBoxes/>
    <Products/>
    <SectionWithThreeDivs/>
    <Pictures/>
    
    
    
    </>
  );
}
