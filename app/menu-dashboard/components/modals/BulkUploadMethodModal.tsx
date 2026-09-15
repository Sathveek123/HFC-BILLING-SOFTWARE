"use client";

import React, { useRef } from 'react';
import { Camera, Mic, FileText, X, Download } from 'lucide-react';

interface BulkUploadMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (file: File) => void;
}

export const BulkUploadMethodModal: React.FC<BulkUploadMethodModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelectPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="bg-white border border-[#E5E7EB] rounded-t-2xl sm:rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Bulk Upload</h2>
            <p className="text-xs text-[#9CA3AF]">Choose Upload Method</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 text-[#9CA3AF] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Option Cards */}
        <div className="space-y-3">
          
          {/* Card 1 — PHOTO */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-[#EEF2FF] border border-indigo-200 rounded-xl flex items-start space-x-4 cursor-pointer hover:bg-indigo-100/80 transition-colors shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-indigo-200 text-[#2563EB] flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">Photo</h3>
              <p className="text-xs text-[#4B5563]">Upload menu card photo</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">
                📷 2/100 uploaded this year
              </span>
            </div>
          </div>

          {/* Card 2 — VOICE MENU CREATE */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl flex items-start space-x-4 opacity-80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">Voice Menu Create</h3>
              <p className="text-xs text-[#4B5563]">Speak menu items with prices</p>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">
                🎤 1/10 used today (shared with voice orders)
              </span>
            </div>
          </div>

          {/* Card 3 — FILE */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start space-x-4 opacity-80 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-300 text-gray-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">File</h3>
              <p className="text-xs text-[#4B5563]">Upload CSV/Excel file</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Columns: Category, Item, Price + optional Portions (Half plate=100 | Full plate=200) and Extras (Extra gravy=30)
              </p>
            </div>
          </div>

        </div>

        {/* Download Sample CSV */}
        <div className="pt-2 text-center">
          <button
            type="button"
            className="px-4 py-2 border border-[#2563EB] text-[#2563EB] rounded-full text-xs font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sample CSV</span>
          </button>
        </div>

      </div>
    </div>
  );
};
