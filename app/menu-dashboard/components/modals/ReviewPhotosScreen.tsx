"use client";

import React from 'react';
import { ArrowLeft, Plus, X, Info, Utensils } from 'lucide-react';

interface ReviewPhotosScreenProps {
  isOpen: boolean;
  imageFile: File | null;
  onBack: () => void;
  onProcess: () => void;
}

export const ReviewPhotosScreen: React.FC<ReviewPhotosScreenProps> = ({
  isOpen,
  imageFile,
  onBack,
  onProcess,
}) => {
  if (!isOpen || !imageFile) return null;

  const imagePreviewUrl = URL.createObjectURL(imageFile);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-4 sm:p-6 overflow-y-auto font-sans">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-sm font-bold text-[#111827] hover:text-[#2563EB]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Review Photos</span>
          </button>

          <button
            onClick={onBack}
            className="text-xs font-semibold text-[#2563EB] flex items-center space-x-1 hover:underline"
          >
            <Plus className="w-4 h-4" />
            <span>Add More</span>
          </button>
        </div>

        <p className="text-xs text-[#9CA3AF] mt-3">1 photo(s) selected</p>

        {/* Preview Card */}
        <div className="mt-4 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm relative max-w-md mx-auto">
          {/* Badge 1 */}
          <div className="absolute top-6 left-6 w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md z-10">
            1
          </div>

          {/* Remove X Button */}
          <button
            onClick={onBack}
            className="absolute top-6 right-6 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md z-10 hover:bg-red-700"
          >
            <X className="w-4 h-4" />
          </button>

          <img
            src={imagePreviewUrl}
            alt="Uploaded Menu Card"
            className="w-full h-80 object-contain rounded-lg bg-gray-50 border border-[#E5E7EB]"
          />
        </div>

        {/* Info Note */}
        <div className="mt-6 max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900 leading-relaxed">
            AI will extract menu items, categories, and prices from these menu photos.
          </p>
        </div>
      </div>

      {/* Bottom Process Button */}
      <div className="pt-6 max-w-md mx-auto w-full">
        <button
          onClick={onProcess}
          className="w-full h-12 bg-[#2563EB] text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-md cursor-pointer"
        >
          <Utensils className="w-4 h-4" />
          <span>Process 1 Photo</span>
        </button>
      </div>

    </div>
  );
};
