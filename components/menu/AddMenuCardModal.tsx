"use client";

import React, { useState } from 'react';
import { X, Plus, Layers } from 'lucide-react';

interface AddMenuCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMenuCard: (name: string) => void;
}

export const AddMenuCardModal: React.FC<AddMenuCardModalProps> = ({
  isOpen,
  onClose,
  onAddMenuCard,
}) => {
  const [menuName, setMenuName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (menuName.trim()) {
      onAddMenuCard(menuName.trim());
      setMenuName('');
      onClose();
    }
  };

  const suggestions = [
    'Biryanis & Starters',
    'Chinese Menu',
    'Beverages & Shakes',
    'Breakfast Special',
    'Combos Menu',
    'Desserts Menu'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div 
        className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 border border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827]">Add New Menu Card</h3>
              <p className="text-[11px] text-[#9CA3AF]">Organize items into separate menu cards</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Menu Card Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Chinese Menu"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-xl text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          {/* Preset Suggestions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-gray-500">Quick Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setMenuName(sug)}
                  className="px-2.5 py-1 bg-[#F3F4F6] text-[#4B5563] hover:bg-[#EEF2FF] hover:text-[#2563EB] rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#D1D5DB] text-[#4B5563] rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Menu Card</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
