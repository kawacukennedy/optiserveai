'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatResponse {
  reply: string;
  showDemoButton?: boolean;
  timestamp: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Welcome to OptiServe AI! I\'m here to help you discover how our AI solutions can transform your business operations.\n\nWhat would you like to know about our services?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: generateId(),
        content: data.reply,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Add demo button message if needed
      if (data.showDemoButton) {
        setTimeout(() => {
          const demoMessage: Message = {
            id: generateId(),
            content: 'DEMO_BUTTON',
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, demoMessage]);
        }, 500);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: generateId(),
        content: 'I apologize, but I\'m experiencing technical difficulties. Please refresh the page and try again, or contact us directly for assistance.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const formatMessage = (content: string) => {
    if (content === 'DEMO_BUTTON') {
      return null; // Handled separately
    }
    
    return content.split('\n').map((line, index) => (
      <p key={index} className={index > 0 ? 'mt-2' : ''}>
        {line}
      </p>
    ));
  };

  const DemoButton = () => (
    <a
      href="https://cal.com/kawacu-kent-vnfqcr/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-3"
      onClick={() => {
        // Track demo button click
        if (typeof gtag !== 'undefined') {
          gtag('event', 'demo_button_clicked', {
            event_category: 'chat_widget',
          });
        }
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Book Demo
    </a>
  );

  return (
    <>
      {/* Chat Bubble */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-80' : 'opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-teal-500/30 group"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <div className="flex items-center justify-center w-full h-full transition-transform duration-300">
            {isOpen ? (
              <X size={24} />
            ) : (
              <MessageCircle size={24} />
            )}
          </div>
          
          {/* Pulse animation */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-teal-500 opacity-60 animate-ping" />
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 z-50 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4 max-w-[calc(100vw-3rem)] md:max-w-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-850 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.5 7H14V14H12V9H10V14H8V7H6.5L12 2Z" fill="white"/>
                    <circle cx="12" cy="18" r="2" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">AI Receptionist</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-md'
                      : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
                  }`}
                >
                  {message.content === 'DEMO_BUTTON' ? (
                    <DemoButton />
                  ) : (
                    <div className="leading-relaxed">
                      {formatMessage(message.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-2xl rounded-bl-md flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">AI is typing...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4 bg-gray-850">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  maxLength={500}
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Responsive Overlay */}
      <style jsx global>{`
        @media (max-width: 480px) {
          .chat-widget {
            position: fixed;
            inset: 0;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            border-radius: 0 !important;
            bottom: 0 !important;
            right: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
