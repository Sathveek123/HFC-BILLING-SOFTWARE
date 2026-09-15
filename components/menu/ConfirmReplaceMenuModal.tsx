"use client";

import React from 'react';
import { AlertTriangle, Layers, Trash2 } from 'lucide-react';

interface ConfirmReplaceMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeepPastMenu: () => void;
  onReplacePastMenu: () => void;
}

export const ConfirmReplaceMenuModal: React.FC<ConfirmReplaceMenuModalProps> = ({
  isOpen,
  onClose,
  onKeepPastMenu,
  onReplacePastMenu,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 font-sans border border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#111827]">Do you want to remove the past menu?</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Most restaurant owners keep past menu cards for multi-category management (e.g. Biryani Menu, Chinese Menu, Drinks Menu). 
          </p>
        </div>

        <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
          <div className="font-semibold text-[#111827] flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-[#2563EB]" />
            <span>Multi-Menu Card System</span>
          </div>
          <p>
            You can keep all 5-6 menu cards intact or create a new Menu Card tab without losing your existing items.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onKeepPastMenu}
            className="w-full py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Keep Past Menu & Add to New Card (Recommended)</span>
          </button>

          <button
            type="button"
            onClick={onReplacePastMenu}
            className="w-full py-2.5 bg-white border border-red-300 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Yes, Delete Past Menu & Replace</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer text-center block pt-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
