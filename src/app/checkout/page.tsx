"use client"; // This directive ensures the component runs only on the client side in a Next.js app.

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import Pic from "@/components/assets/Rectangle 1.png"
import Logo from "@/components/assets/Meubel House_Logos-05.png"
import Logo2 from "@/components/assets/cup.png"
import Logo3 from "@/components/assets/shipping.png"
import Logo4 from "@/components/assets/customer-support.png"
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

// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  
  // State to store the client secret, which is required for processing the payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // When the component mounts, request a new PaymentIntent from the server
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret); // Save the client secret to state
    });
  }, []);
  console.log(clientSecret);

  // While waiting for the client secret, show a loading message
  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading...
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        {/* Wrap the payment form inside the Elements provider with Stripe instance and client secret */}
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe's payment element (handles input fields for card details, etc.) */}
      <div className="p-4 border rounded-lg">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-bold transition-colors"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      <div>
        
      </div>
      {/* Display any error messages if they occur */}
      {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
    </form>
    
  
  );
}


