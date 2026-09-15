"use client";

import React from 'react';
import { MenuCategory, MenuItem } from '@/types';
import { ItemRow } from './ItemRow';
import { Trash2, GripVertical } from 'lucide-react';
import { useAppState } from '@/lib/store';

interface CategorySectionProps {
  category: MenuCategory;
  items: MenuItem[];
  onEditItem: (item: MenuItem) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  onEditItem,
}) => {
  const { deleteCategory } = useAppState();

  const handleDeleteCategory = () => {
    if (confirm(`Delete "${category.name}" and all its items?`)) {
      deleteCategory(category.id);
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl mb-4 p-4 shadow-xs space-y-3">
      {/* Category Header Row */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <h3 className="font-bold text-lg text-[#2563EB] uppercase tracking-wide">
          {category.name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-1 rounded-md text-[#2563EB] hover:bg-blue-50 cursor-grab"
            title="Drag to Reorder"
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleDeleteCategory}
            className="p-1 rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
            title="Delete Category"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} onEdit={onEditItem} />
        ))}

        {items.length === 0 && (
          <div className="text-center py-4 text-xs text-[#9CA3AF] bg-[#F9FAFB] rounded-xl border border-dashed border-[#E5E7EB]">
            No items in this category yet. Tap "+ Add Item" below to create one.
          </div>
        )}
      </div>
    </div>
  );
};
