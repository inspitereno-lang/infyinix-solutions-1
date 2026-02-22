import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
}

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: 'Hi! I am the Infynix AI Assistant. How can I help you transform your digital experience today?',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue.trim(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const responses = [
                "That's a great question! Our team specializes in solving complex digital challenges.",
                "I can certainly help with that. Would you like to schedule a consultation with our experts?",
                "Infynix offers end-to-end product development, from strategy to deployment and maintenance.",
                "We leverage the latest technologies including AI, Cloud, and Web3 to build scalable solutions.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: randomResponse,
            };

            setMessages((prev) => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[#00E0C6] to-[#00D9FF] text-black shadow-lg shadow-[#00E0C6]/30 hover:scale-110 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                aria-label="Open AI Chat"
            >
                <MessageSquare className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] bg-[#0A0D14] border border-[#00E0C6]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0D1A40] to-infynix-blue p-4 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E0C6] to-[#00D9FF] flex items-center justify-center p-1.5">
                            <Sparkles className="w-full h-full text-black" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm">Infynix AI</h3>
                            <p className="text-[#00E0C6] text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E0C6] animate-pulse"></span> Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.type === 'user'
                                    ? 'bg-gradient-to-r from-[#00E0C6] to-[#00D9FF] text-black rounded-br-none'
                                    : 'bg-[#1A1D24] border border-white/5 text-gray-200 rounded-bl-none'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-[#1A1D24] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3">
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-[#0A0D14] border-t border-white/10">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-[#1A1D24] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E0C6]/50 placeholder:text-gray-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className="w-10 h-10 rounded-full bg-[#00E0C6]/10 text-[#00E0C6] hover:bg-[#00E0C6]/20 disabled:opacity-50 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AIChatWidget;
