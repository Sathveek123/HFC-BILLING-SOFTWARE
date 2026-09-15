"use client";

import React from 'react';
import { MenuItem } from '@/types';
import { useAppState } from '@/lib/store';
import { Utensils } from 'lucide-react';

interface ItemRowProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit }) => {
  const { updateMenuItem } = useAppState();

  const handleStockToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateMenuItem(item.id, { is_available: !item.is_available });
  };

  const formattedPrice = item.half_price
    ? `₹${item.half_price} / ₹${item.price}`
    : `₹${item.price}`;

  return (
    <div
      onClick={() => onEdit(item)}
      className="bg-[#EEF2FF] rounded-xl mb-2 p-3 flex items-center justify-between hover:bg-indigo-100/70 transition-all cursor-pointer select-none border border-indigo-100"
    >
      <div className="flex items-center space-x-3 min-w-0">
        {/* Food Image */}
        <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-white shrink-0 border border-indigo-100 flex items-center justify-center">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Utensils className="w-6 h-6 text-[#2563EB]" />
          )}
        </div>

        {/* Item Details */}
        <div className="min-w-0 space-y-0.5">
          <h4 className="font-bold text-sm text-[#111827] truncate">{item.name}</h4>
          <div className="text-sm font-semibold text-[#2563EB]">
            {formattedPrice}
          </div>
          <button
            type="button"
            onClick={handleStockToggle}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 cursor-pointer transition-colors ${
              item.is_available
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            <span>{item.is_available ? '✅ In Stock' : '❌ Out of Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
