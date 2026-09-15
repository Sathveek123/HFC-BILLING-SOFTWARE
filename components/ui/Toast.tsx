"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2.5 bg-[#111827] text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-800 text-xs font-semibold animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
      {type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
      
      <span className="flex-1 truncate">{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="p-1 text-gray-400 hover:text-white rounded-md transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
