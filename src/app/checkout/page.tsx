"use client"; // This directive ensures the component runs only on the client side in a Next.js app.
// Install @stripe/stripe-js & @stripe/react-stripe-js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import Pic from "@/components/assets/Rectangle 1.png"
import Logo2 from "@/components/assets/cup.png"
import Logo3 from "@/components/assets/shipping.png"
import Logo4 from "@/components/assets/customer-support.png"
import Image from 'next/image';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/assets/Meubel House_Logos-05.png"

// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Component that handles the payment form
function PaymentForm() {
  const stripe = useStripe(); // Hook to access Stripe methods
  const elements = useElements(); // Hook to access Stripe elements
  const [isProcessing, setIsProcessing] = useState(false); // State to manage loading state while processing
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to show error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh when submitting the form

    if (!stripe || !elements) return; // Ensure Stripe is loaded before proceeding

    setIsProcessing(true); // Indicate that the payment is being processed

    // Attempt to confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Redirect if required by the payment method
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred"); // Display error message if payment fails
      setIsProcessing(false);
    } else {
      // Payment was successful
      setErrorMessage(null);
      alert("Payment successful!"); // Notify the user
      setIsProcessing(false);
      // You can optionally redirect the user to a success page here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe's payment element (handles input fields for card details, etc.) */}
      <PaymentElement />
      <button type="submit" className="bg-yellow-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-black transition-all" 
      disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"} {/* Show dynamic button text */}
      
      </button>
      {/* Display any error messages if they occur */}
      {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
    </form>
  );
}

export default function CheckoutPage() {
  // State to store the client secret, which is required for processing the payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // When the component mounts, request a new PaymentIntent from the server
    createPaymentIntent()
      .then((res) => {
          setClientSecret(res.clientSecret); // Save the client secret to state
      })
  }, []);
  console.log(clientSecret);

  // While waiting for the client secret, show a loading message
  if (!clientSecret) {
    return <div>Loading...</div>;
  }
  const features = [
    {
      icon: Logo2,
      title: 'High Quality',
      description: 'crafted from top materials'
    },
    {
      icon: Logo3,
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
  
  return (
    <div>
    <div className="relative h-[300px] w-full mb-10 mt-40">
      <Image
        src={Pic}
        alt="Comparison background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src={Logo}
          alt="Logo"
          width={70}
          height={70}
          quality={100}
          className="mb-0"
        />
        <h1 className="text-4xl font-semibold mb-4">Checkout</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="hover:underline font-bold">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart1" className="hover:underline font-bold"> Cart</Link>
          <ChevronRight className="w-4 h-4 font-bold" />
          <span className='font-bold hover:underline'>Checkout</span>
        </div>
      </div>
    </div>
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Checkout</h1>
      {/* Wrap the payment form inside the Elements provider with Stripe instance and client secret */}
      <Elements stripe={stripePromise} 
      options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
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
    </div>

  );
}