import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Maximize2, Minimize2, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Hi! I\'m your newjersey.list assistant. I can help you find listings, create posts, or answer any questions you have.',
    timestamp: new Date(),
  },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('looking for') || input.includes('search')) {
      return "I can help you find what you're looking for! Could you provide more details about what you're interested in? For example, the category, price range, or location?";
    }
    if (input.includes('post') || input.includes('sell')) {
      return "To create a new listing, click the 'Post' button in the top navigation bar. Make sure to include clear photos and detailed descriptions to attract more buyers!";
    }
    if (input.includes('price') || input.includes('cost')) {
      return "I can help you understand pricing in different categories. What type of item or service are you interested in?";
    }
    return "I'm here to help! Feel free to ask about finding listings, posting items, or any other questions about newjersey.list.";
  };

  return (
    <>
      {/* Mobile Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 md:hidden ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Desktop Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hidden md:flex ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed z-50 ${
              // Mobile: Full screen
              'md:right-8 md:bottom-8 md:w-96 md:h-[600px] ' +
              // Desktop: Fixed size
              'inset-0 md:inset-auto'
            }`}
          >
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-25 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <div className={`relative h-full md:h-auto ${
              isMinimized ? 'md:h-14' : 'md:h-[600px]'
            } bg-white md:rounded-lg shadow-xl overflow-hidden flex flex-col`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
                <h3 className="font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Assistant
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-blue-500 rounded md:block hidden"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-blue-500 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex space-x-1"
                          >
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                          </motion.div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t bg-white">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                      }}
                      className="flex space-x-2"
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button type="submit" disabled={!input.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}