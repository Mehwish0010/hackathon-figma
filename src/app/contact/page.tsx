import Image from 'next/image'
import Pic from "@/components/assets/Rectangle 1.png"
import Logo1 from "@/components/assets/cup.png"
import Logo2 from "@/components/assets/Group.png"
import Logo3 from "@/components/assets/shipping.png"
import Logo4 from "@/components/assets/customer-support.png"
import Icon1 from "@/components/assets/address.png"
import Icon2 from "@/components/assets/bxs_phone.png"
import Icon3 from "@/components/assets/bi_clock-fill(1).png"
const features = [
    {
      icon: Logo1,
      title: 'High Quality',
      description: 'crafted from top materials'
    },
    {
      icon: Logo2,
      title: 'Warranty Protection',
      description: 'Over 2 years'
    },
    {
      icon: Logo3,
      title: 'Free Shipping',
      description: 'Order over 150 $'
    },
    {
      icon: Logo4,
      title: '24 / 7 Support',
      description: 'Dedicated support'
    }
  ]

export default function ContactPage() {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-16 font-poppins">
      {/* Header */}
      <div className="text-center mb-16 max-w-10xl mx-auto">
      <Image 
        src={Pic} 
        alt="poster"
        height={400} 
        width={1300}
       
        className="object-cover h-[400] w-[full] "
      />
        <h1 className="text-3xl  mt-20 md:text-4xl font-poppinsSemiBold mb-4">Get In Touch With Us</h1>
        <p className="text-gray-600 text-sm text-lightGray max-w-xl mx-auto">
          For More Information About Our Product & Services. Please Feel Free To Drop Us
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Information */}
        <div className="space-y-8">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={Icon1}
                alt="Address icon"
                height={20}
                width={20}
                quality={100}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Address</h3>
              <p className="text-gray-600">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={Icon2}
                alt="Phone icon"
                height={20}
                width={20}
                quality={100}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Phone</h3>
              <div className="text-gray-600 space-y-1">
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>
          </div>

          {/* Working Time */}
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={Icon3}
                alt="Time icon"
                height={20}
                width={20}
                quality={100}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Working Time</h3>
              <div className="text-gray-600 space-y-1">
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm">Your name</label>
              <input
                
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-5 border border-lightGray rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Email address</label>
              <input
                type="email"
                placeholder="Enter your email account"
                className="w-full px-3 py-5 border border-lightGray rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Subject</label>
              <input
                type="text"
                placeholder="Subject you want to discuss"
                className="w-full px-3 py-5 border border-lightGray rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Message</label>
              <textarea
                rows={4}
                placeholder="Hi! I'd like to ask about"
                className="w-full p-3 border border-lightGray rounded-lg resize-none"
              />
            </div>

            <button 
              className="py-3 px-14 font-poppins text-xs bg-[#B88E2F] hover:bg-[#9d7829] text-white rounded-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      
    </div>
    <div className="w-full bg-[#FAF3EA] mx-auto px-4 py-16 mt-6 pl-6 lg:pl-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="flex items-center gap-4 pl-8 md:pl-0"
            >
              <div className="mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  quality={100}
                />
              </div>
              <div className='flex flex-col'>
              <h3 className="text-[#333333] text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#666666] text-base">
                {feature.description}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
