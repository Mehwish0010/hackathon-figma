"use client"; // This directive ensures the component runs only on the client side in a Next.js app.

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import Pic from "@/components/assets/Rectangle 1.png";
import Logo2 from "@/components/assets/cup.png";
import Logo3 from "@/components/assets/shipping.png";
import Logo4 from "@/components/assets/customer-support.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/assets/Meubel House_Logos-05.png";

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
      // Optionally, redirect the user to a success page here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe's payment element (handles input fields for card details, etc.) */}
      <PaymentElement />
      <button
        type="submit"
        className="bg-yellow-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-black transition-all w-full"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {/* Display any error messages if they occur */}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
}

export default function CheckoutPage() {
  // State to store the client secret, which is required for processing the payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // When the component mounts, request a new PaymentIntent from the server
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret); // Save the client secret to state
    });
  }, []);

  // While waiting for the client secret, show a loading message
  if (!clientSecret) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const features = [
    {
      icon: Logo2,
      title: "High Quality",
      description: "Crafted from top materials",
    },
    {
      icon: Logo3,
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: Logo3,
      title: "Free Shipping",
      description: "Order over $150",
    },
    {
      icon: Logo4,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full mb-10 h-64 md:h-80 lg:h-[400px]">
        <Image
          src={Pic}
          alt="Comparison background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Image
            src={Logo}
            alt="Logo"
            width={70}
            height={70}
            quality={100}
            className="mb-2"
          />
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-black">
            <Link href="/" className="hover:underline font-bold">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart1" className="hover:underline font-bold">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold hover:underlinen text-black">Checkout</span>
          </div>
        </div>
      </div>

      {/* Payment Form Section */}
      <div className="max-w-sm mx-auto px-4">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>

      {/* Features Section */}
      <div className="w-full mt-10 bg-[#FAF3EA] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  quality={100}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#333333] text-xl font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#666666] text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
