'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Expanded predefined responses with more detailed product information
const furnitureResponses = {
  greeting: "Hello! 👋 Welcome to Furniro. I'm here to help you find the perfect furniture for your home. Would you like to:\n\n1. Browse our product categories\n2. Learn about our current deals\n3. Get help with shipping & delivery\n4. Ask about warranty & returns\n\nJust type the number or ask your question!",
  
  categories: "We have several furniture categories. Which interests you?\n\n1. Living Room (Sofas, Chairs, Tables)\n2. Bedroom (Beds, Wardrobes)\n3. Dining Room (Tables, Chairs)\n4. Office (Desks, Chairs)\n5. Outdoor Furniture",
  
  livingRoom: "Our living room collection includes:\n\n• Premium Sofas ($599-$2999)\n• Accent Chairs ($299-$899)\n• Coffee Tables ($199-$699)\n\nWould you like to:\n1. See specific items\n2. Learn about materials\n3. Check comfort features",
  
  bedroom: "Our bedroom collection features:\n\n• Luxury Beds ($799-$3999)\n• Wardrobes ($599-$1999)\n• Nightstands ($149-$499)\n\nWould you like to:\n1. View specific styles\n2. Learn about mattress options\n3. Check storage solutions",
  
  comfort: "Our furniture is designed for maximum comfort with:\n\n• High-density foam cushioning\n• Ergonomic design\n• Premium spring systems\n• Adjustable features\n\nWould you like specific comfort details for any piece?",
  
  materials: "We use premium materials including:\n\n• Solid hardwood frames\n• Top-grain leather\n• Performance fabrics\n• Hypoallergenic materials\n\nAll materials come with care instructions. Would you like to know more about any specific material?",
  
  warranty: "Our warranty coverage includes:\n\n• 5-year frame warranty\n• 3-year cushion warranty\n• 1-year fabric/leather warranty\n\nWould you like to:\n1. See full warranty details\n2. Learn about extended warranty\n3. Know about care instructions",
  
  shipping: "Shipping options:\n\n• Free standard shipping (7-10 days)\n• Express delivery (2-3 days) - $99\n• White glove delivery available\n\nWould you like to:\n1. Calculate shipping cost\n2. Track an order\n3. Learn about assembly services",
  
  ordering: "How to order:\n\n1. Select items online or in-store\n2. Choose fabric/color options\n3. Select delivery method\n4. Secure checkout with multiple payment options\n\nWould you like help with any of these steps?",
  
  price: "Our prices are competitive and we offer:\n\n• 0% financing for 12 months\n• Seasonal discounts\n• Bundle savings\n• Price matching\n\nWould you like to know the price range for specific items?",
  
  default: "I can help you with:\n\n1. Product information\n2. Pricing and deals\n3. Shipping details\n4. Warranty coverage\n5. Ordering process\n\nWhat would you like to know more about?"
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: furnitureResponses.greeting
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Show initial animation after 2 seconds
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      role: 'user' as const,
      content: inputMessage
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Enhanced keyword detection and response logic
    setTimeout(() => {
      const input = inputMessage.toLowerCase()
      let responseContent = ''

      // Check for numeric responses first
      if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5') {
        const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
        
        if (lastAssistantMessage?.content.includes('product categories')) {
          switch(input) {
            case '1': responseContent = furnitureResponses.livingRoom; break;
            case '2': responseContent = furnitureResponses.bedroom; break;
            case '3': responseContent = furnitureResponses.categories; break;
            case '4': responseContent = furnitureResponses.warranty; break;
            case '5': responseContent = furnitureResponses.shipping; break;
          }
        } else {
          responseContent = furnitureResponses.categories
        }
      }
      // Keyword-based responses
      else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        responseContent = furnitureResponses.greeting
      }
      else if (input.includes('living') || input.includes('sofa') || input.includes('couch')) {
        responseContent = furnitureResponses.livingRoom
      }
      else if (input.includes('bed') || input.includes('bedroom') || input.includes('sleep')) {
        responseContent = furnitureResponses.bedroom
      }
      else if (input.includes('comfort') || input.includes('soft') || input.includes('firm')) {
        responseContent = furnitureResponses.comfort
      }
      else if (input.includes('material') || input.includes('fabric') || input.includes('leather')) {
        responseContent = furnitureResponses.materials
      }
      else if (input.includes('warranty') || input.includes('guarantee')) {
        responseContent = furnitureResponses.warranty
      }
      else if (input.includes('ship') || input.includes('delivery')) {
        responseContent = furnitureResponses.shipping
      }
      else if (input.includes('order') || input.includes('buy') || input.includes('purchase')) {
        responseContent = furnitureResponses.ordering
      }
      else if (input.includes('price') || input.includes('cost') || input.includes('expensive')) {
        responseContent = furnitureResponses.price
      }
      else {
        responseContent = furnitureResponses.default
      }

      const aiResponse = {
        role: 'assistant' as const,
        content: responseContent
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed top-24 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="bg-[#B88E2F] hover:bg-[#9c7629] text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
            {isFirstLoad && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute right-0 top-16 bg-white p-3 rounded-lg shadow-lg w-64"
              >
                <div className="relative">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45" />
                  <p className="text-sm text-gray-700">Need help finding the perfect furniture? Ask our expert! 🛋️</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col"
          >
            <div className="bg-[#B88E2F] p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="text-white font-semibold">Furniture Expert</h3>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#B88E2F] text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-lg flex gap-2">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about our furniture..."
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#B88E2F]"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#9c7629]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 