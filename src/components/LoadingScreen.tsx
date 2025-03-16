import React from 'react';
import { BrainCog } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[var(--background-primary)] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-[var(--accent-primary)]/20 animate-spin">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BrainCog className="w-12 h-12 text-[var(--accent-primary)]" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-t-4 border-[var(--accent-primary)] animate-spin" />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent animate-pulse">
            TechnicIA
          </h2>
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    </div>
  );
}