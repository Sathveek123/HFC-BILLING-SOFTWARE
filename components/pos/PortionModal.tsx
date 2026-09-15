"use client";

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types';

interface PortionModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: MenuItem, variant: 'half' | 'full', variantLabel: string) => void;
}

export const PortionModal: React.FC<PortionModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<'half' | 'full'>('half');

  useEffect(() => {
    if (isOpen) {
      setSelectedVariant('half');
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const halfPrice = item.half_price || item.price;
  const fullPrice = item.price;
  const currentPrice = selectedVariant === 'half' ? halfPrice : fullPrice;
  const selectedLabel = selectedVariant === 'half' ? '1 Person' : '2 Persons';

  const handleAdd = () => {
    onConfirm(item, selectedVariant, selectedLabel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1 bg-gray-900 rounded-full mx-auto" />

        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#111827]">{item.name}</h2>
          <p className="text-sm font-semibold text-gray-700">Choose portion (Required)</p>
        </div>

        {/* Portion Radio Options */}
        <div className="space-y-4 py-2">
          {/* Option 1: 1 Person / Half Portion */}
          <label 
            onClick={() => setSelectedVariant('half')}
            className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
              selectedVariant === 'half'
                ? 'border-[#2563EB] bg-blue-50/40 text-[#111827]'
                : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedVariant === 'half' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-gray-400 bg-white'
              }`}>
                {selectedVariant === 'half' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="text-base font-semibold text-[#111827]">1 Person</span>
            </div>
            <span className="text-base font-bold text-[#2563EB]">₹{halfPrice}</span>
          </label>

          {/* Option 2: 2 Persons / Full Portion */}
          <label 
            onClick={() => setSelectedVariant('full')}
            className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
              selectedVariant === 'full'
                ? 'border-[#2563EB] bg-blue-50/40 text-[#111827]'
                : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedVariant === 'full' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-gray-400 bg-white'
              }`}>
                {selectedVariant === 'full' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="text-base font-semibold text-[#111827]">2 Persons</span>
            </div>
            <span className="text-base font-bold text-[#2563EB]">₹{fullPrice}</span>
          </label>
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[#2563EB] hover:text-blue-800 transition-colors px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-2.5 bg-[#2563EB] text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md cursor-pointer flex items-center space-x-1"
          >
            <span>Add</span>
            <span>•</span>
            <span>₹{currentPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
