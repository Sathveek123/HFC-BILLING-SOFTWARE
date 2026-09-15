"use client";

import React from 'react';
import { Upload, PlusCircle, Plus } from 'lucide-react';

interface BottomActionBarProps {
  onOpenUpload: () => void;
  onOpenCategory: () => void;
  onOpenAddItem: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onOpenUpload,
  onOpenCategory,
  onOpenAddItem,
}) => {
  return (
    <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 bg-[#2563EB] text-white z-40 h-14 shadow-lg border-t border-blue-700 font-sans">
      <div className="h-full max-w-7xl mx-auto grid grid-cols-3 divide-x divide-blue-500/50">
        
        {/* Tap Target 1: Upload */}
        <button
          type="button"
          onClick={onOpenUpload}
          className="flex items-center justify-center space-x-2 hover:bg-blue-700/80 active:bg-blue-800 transition-colors font-bold text-sm cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>

        {/* Tap Target 2: Category */}
        <button
          type="button"
          onClick={onOpenCategory}
          className="flex items-center justify-center space-x-2 hover:bg-blue-700/80 active:bg-blue-800 transition-colors font-bold text-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Category</span>
        </button>

        {/* Tap Target 3: Add Item */}
        <button
          type="button"
          onClick={onOpenAddItem}
          className="flex items-center justify-center space-x-2 hover:bg-blue-700/80 active:bg-blue-800 transition-colors font-bold text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>

      </div>
    </div>
  );
};
