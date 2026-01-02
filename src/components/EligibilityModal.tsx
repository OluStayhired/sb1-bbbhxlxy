// src/components/EligibilityModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Upload, 
  Mail, 
  CheckCircle2, 
  User,
  Sparkles,
  FileText,
  ArrowUpRight,
  Loader2,
  Brain,
  Shield
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi I'm Ellie, here to help you with long term care insurance. What questions do you have about LTCI eligibility?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prewrittenQuestions = [
    "What are the basic eligibility requirements for long term care insurance?",
    "How do pre-existing conditions affect LTCI eligibility?"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  // Simulate typing effect
  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response (in production, this would call your LLM API)
    const responses: { [key: string]: string } = {
      "basic": "Long Term Care Insurance eligibility typically requires: (1) Being between ages 40-84, (2) No current need for assistance with daily activities, (3) No severe cognitive impairment, (4) Ability to pass health underwriting. Most carriers review your medical history for the past 5-10 years.",
      "pre-existing": "Pre-existing conditions can significantly impact LTCI eligibility. Conditions like Parkinson's, MS, recent strokes, or dementia typically result in denial. However, well-managed chronic conditions like diabetes or high blood pressure may be approved with proper medical records. Each insurer has different underwriting guidelines.",
      "default": "That's a great question about long term care insurance. Based on current LTCI standards, eligibility depends on your age, health status, and ability to perform activities of daily living independently. Would you like me to elaborate on any specific aspect of eligibility?"
    };

    let response = responses.default;
    if (content.toLowerCase().includes('basic') || content.toLowerCase().includes('requirement')) {
      response = responses.basic;
    } else if (content.toLowerCase().includes('pre-existing') || content.toLowerCase().includes('condition')) {
      response = responses["pre-existing"];
    }

    await simulateTyping(response);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `📎 Uploaded document: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      simulateTyping("Thank you for uploading your document. I'm reviewing it now. Based on the information provided, I can help you understand your LTCI eligibility better. What specific questions do you have about the document?");
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);

    try {
      // Save conversation summary to database
      const conversationSummary = messages
        .map(m => `${m.role === 'user' ? 'You' : 'Ellie'}: ${m.content}`)
        .join('\n\n');

      const { error } = await supabase
        .from('ltci_conversations')
        .insert({
          email: email,
          conversation: conversationSummary,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Error saving conversation:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Long Term Care Eligibility</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Ellie's Profile */}
          <div className="w-1/3 bg-gradient-to-br from-red-50 to-rose-50 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
              {/* Avatar and Name */}
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
                  <img
             
              //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/olu_profile_dark.png"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-care-assistant.png"
              alt="Image 1"
              className="relative rounded-full w-full h-full aspect-square" // Square aspect ratio for stacked images
            />
                  {/*<User className="w-12 h-12 text-white" />*/}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ellie</h3>
                <p className="text-sm font-semibold text-red-600 flex items-center justify-center space-x-1 mt-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Long Term Care Assistant</span>
                </p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100 duration-500 hover:border-red-200 hover:shadow-md">
                <p className="text-sm text-gray-700 leading-relaxed hover:text-red-600 duration-500">
                  Hey there I'm Ellie! I know how hard it is to navigate long term care insurance. 
                  I'm here to help you figure out your options, answer your questions and guide you through the eligibility process with clarity.
                </p>
              </div>

              {/* What I Can Help With */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100 duration-500 hover:border-red-200 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-red-500" />
                  <span>What I Can Help With:</span>
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="hover:text-red-500 duration-500">Understanding LTCI eligibility criteria</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="hover:text-red-500 duration-500">Answering pre-existing condition questions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="hover:text-red-500 duration-500">Reviewing health underwriting issues</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="hover:text-red-500 duration-500">Explaining age and timing considerations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="hover:text-red-500 duration-500">Discussing alternative coverage options</span>
                  </li>
                </ul>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-lg p-4 text-white text-center">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  Your information is confidential and secure
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >

                    {/* Avatar for Ellie (assistant messages only) */}
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-200 shadow-sm">
                          <img
                              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-care-assistant.png"
                              alt="Ellie"
                              className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
    
                    <div className="flex flex-col">
                      {/* Name label for Ellie */}
                      {message.role === 'assistant' && (
                      <span className="text-xs font-semibold text-red-600 mb-1 ml-1">
                        Ellie
                      </span>
                      )}
      
              {/* Message bubble */}
                  <div
                    className={`max-w-[75%] rounded-lg p-4 ${
                      message.role === 'user'
                      ? 'bg-red-500 text-white hover:shadow-md hover:shadow-red-200 duration-500'
                      : 'bg-gray-100 text-gray-900 border border-gray-200 hover:shadow-md hover:border-red-200 duration-500'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
            </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                      <span className="text-sm text-gray-600">Ellie is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Pre-written Questions */}
            <div className="px-6 pb-2">
              <div className="flex flex-wrap gap-2">
                {prewrittenQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-xs px-3 py-2 bg-white border border-red-200 text-red-600 rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Ask me anything about LTCI eligibility..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
                
                {/* Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
                  title="Upload document"
                >
                  <Upload className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                </button>

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-lg transition-all ${
                    inputValue.trim()
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Email Summary Section */}
              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 border border-red-100">
                <form onSubmit={handleEmailSubmit} className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get conversation summary via email"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !email.trim()}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center space-x-2 ${
                      emailSent
                        ? 'bg-green-500 text-white'
                        : email.trim()
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </form>
                {emailSent && (
                  <p className="text-xs text-green-600 mt-2 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Summary sent to {email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityModal;
