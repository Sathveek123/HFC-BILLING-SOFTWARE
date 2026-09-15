"use client";

import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '@/types';
import { ItemRow } from './ItemRow';
import { Trash2, GripVertical } from 'lucide-react';
import { useAppState } from '@/lib/store';
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl mb-4 p-4 shadow-xs space-y-3 font-sans">
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
            onClick={() => setShowDeleteModal(true)}
            className="p-1 rounded-md text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
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

      {/* Professional Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        title="Delete Category"
        message={`Are you sure you want to delete "${category.name}" and all its ${items.length} items? This action will remove them from your menu.`}
        onConfirm={() => deleteCategory(category.id)}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
};
