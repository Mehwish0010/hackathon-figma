'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! 👋 How can I help you with your furniture needs today?'
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

    // Simulate AI response - Replace this with your actual AI integration
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: `Thank you for your message. I'm here to help with any questions about our furniture collection, shipping, or general inquiries.`
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
                className="absolute right-0 top-16 bg-white p-3 rounded-lg shadow-lg w-48"
              >
                <div className="relative">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45" />
                  <p className="text-sm text-gray-700">Need help? Chat with our furniture expert! 🛋️</p>
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
                <h3 className="text-white font-semibold">Furniture Assistant</h3>
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
                      {message.content}
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
                  placeholder="Type your message..."
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