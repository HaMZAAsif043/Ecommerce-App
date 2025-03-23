import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample bot responses
  const botResponses = {
    greeting: [
      "Hello! How can I help you today?",
      "Hi there! What can I assist you with?",
      "Welcome to ShopEase! How may I help you?",
    ],
    product: [
      "We have a wide range of products. You can browse our categories or search for specific items.",
      "Our products are carefully selected for quality and value. Check out our deals section for special offers!",
    ],
    shipping: [
      "We offer free shipping on orders over $100. Standard delivery takes 3-5 business days.",
      "Shipping is calculated at checkout. We ship to most countries worldwide.",
    ],
    returns: [
      "We have a 30-day return policy. Items must be in original condition with tags attached.",
      "Returns are easy! Just go to your order history and select 'Return Item'.",
    ],
    payment: [
      "We accept all major credit cards, PayPal, and Apple Pay.",
      "Your payment information is secure with our encrypted checkout process.",
    ],
    default: [
      "I'm not sure I understand. Could you rephrase that?",
      "Let me connect you with customer service for more help. You can reach them at support@shopease.com.",
      "I'm still learning! For specific questions, please email our support team.",
    ],
  };

  // Add initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const randomGreeting =
        botResponses.greeting[
        Math.floor(Math.random() * botResponses.greeting.length)
        ];
      setMessages([
        {
          id: Date.now(),
          text: randomGreeting,
          sender: "bot",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    let responseType = "default";

    if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey")
    ) {
      responseType = "greeting";
    } else if (
      lowerMessage.includes("product") ||
      lowerMessage.includes("item") ||
      lowerMessage.includes("buy")
    ) {
      responseType = "product";
    } else if (
      lowerMessage.includes("ship") ||
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("arrive")
    ) {
      responseType = "shipping";
    } else if (
      lowerMessage.includes("return") ||
      lowerMessage.includes("refund") ||
      lowerMessage.includes("exchange")
    ) {
      responseType = "returns";
    } else if (
      lowerMessage.includes("pay") ||
      lowerMessage.includes("card") ||
      lowerMessage.includes("checkout")
    ) {
      responseType = "payment";
    }

    const responses = botResponses[responseType];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(
      () => {
        const botMessage = {
          id: Date.now() + 1,
          text: getBotResponse(userMessage.text),
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    ); // Random delay between 1-2 seconds
  };

  return (
    <div className="fixed bottom-2 right-4 z-50">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="h-12 w-12 rounded-full shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : 400,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-primary text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Customer Support</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="text-white hover:text-gray-200"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            {!isMinimized && (
              <>
                <ScrollArea className="p-3 h-[300px]">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Chat input */}
                <form
                  onSubmit={handleSendMessage}
                  className="border-t p-3 flex items-center"
                >
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="ml-2 reltive bottom-0"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
