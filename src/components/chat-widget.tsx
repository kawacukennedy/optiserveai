'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}


export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Hello! I\'m Kenneth, your AI receptionist at OptiServe AI. I\'m here to help you discover how our AI-powered dispatch solutions can transform your home service business operations.\n\nWhat would you like to know about our services?',
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

    // Create streaming assistant message
    const streamingMessageId = generateId();
    const initialAssistantMessage: Message = {
      id: streamingMessageId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, initialAssistantMessage]);
    setIsTyping(false); // Stop typing indicator, start streaming

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages
            .slice(-12) // Keep more context for better conversation flow
            .filter(msg => msg.content !== 'DEMO_BUTTON') // Remove demo buttons from context
            .map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let shouldShowDemoButton = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'chunk') {
                  // Update the streaming message with new content
                  setMessages(prev => prev.map(msg => 
                    msg.id === streamingMessageId 
                      ? { ...msg, content: msg.content + data.chunk }
                      : msg
                  ));
                } else if (data.type === 'complete') {
                  // Finalize the message
                  shouldShowDemoButton = data.showDemoButton;
                  setMessages(prev => prev.map(msg => 
                    msg.id === streamingMessageId 
                      ? { ...msg, content: data.fullResponse }
                      : msg
                  ));
                } else if (data.type === 'error') {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.error('Error parsing streaming data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      // Add demo button message if needed
      if (shouldShowDemoButton) {
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
      // Replace the streaming message with error message
      setMessages(prev => prev.map(msg => 
        msg.id === streamingMessageId 
          ? { 
              ...msg, 
              content: 'I apologize, but I\'m experiencing technical difficulties. Please refresh the page and try again, or contact us directly for assistance.' 
            }
          : msg
      ));
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
      className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-teal to-primary-teal-dark hover:from-primary-teal-dark hover:to-primary-teal-light text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-3"
      onClick={() => {
        // Track demo button click
        if (typeof window !== 'undefined' && 'gtag' in window) {
          const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
          if (gtag) {
            gtag('event', 'demo_button_clicked', {
              event_category: 'chat_widget',
            });
          }
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
          className="relative w-16 h-16 bg-gradient-to-r from-primary-teal to-primary-teal-dark hover:from-primary-teal-dark hover:to-primary-teal-light text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-teal/30 group"
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
            <div className="absolute inset-0 rounded-full bg-primary-teal opacity-60 animate-ping" />
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] glass rounded-2xl shadow-2xl border border-gray-800/50 z-50 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-4 max-w-[calc(100vw-3rem)] sm:max-w-96 lg:w-[28rem] lg:h-[36rem] xs:fixed xs:inset-0 xs:w-full xs:h-full xs:rounded-none xs:border-0 xs:bottom-0 xs:right-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-navy/80 to-primary-navy-light/80 backdrop-blur-sm border-b border-gray-700/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-teal to-primary-teal-dark rounded-lg flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.5 7H14V14H12V9H10V14H8V7H6.5L12 2Z" fill="white"/>
                    <circle cx="12" cy="18" r="2" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Kenneth - AI Receptionist</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <div className="w-2 h-2 bg-primary-teal rounded-full animate-pulse"></div>
                    <span>Online & Ready to Help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700/50"
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
                      ? 'bg-gradient-to-r from-primary-teal to-primary-teal-dark text-white rounded-br-md'
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
                    <div className="w-2 h-2 bg-primary-teal rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  maxLength={500}
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-primary-teal to-primary-teal-dark hover:from-primary-teal-dark hover:to-primary-teal-light disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-teal"
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
