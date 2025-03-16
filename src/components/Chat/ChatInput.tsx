import React, { useState, useRef } from 'react';
import { Send, Image, Mic, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onUploadImage: (file: File) => void;
  isTyping: boolean;
}

export default function ChatInput({ onSendMessage, onUploadImage, isTyping }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 bg-[var(--background-secondary)] p-2 rounded-lg">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-[var(--background-primary)] rounded-full transition-colors"
          title="Upload image"
        >
          <Image className="w-5 h-5" />
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isTyping ? "TechnicIA is typing..." : "Type your message..."}
          disabled={isTyping}
          className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
        />
        
        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className={`p-2 rounded-full transition-all ${
            message.trim() && !isTyping
              ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)]'
              : 'bg-[var(--background-primary)] opacity-50 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}