"use client";

import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Utensils } from 'lucide-react';
import { useAppState } from '@/lib/store';
import { MenuItem } from '@/types';

interface AddItemModalProps {
  isOpen: boolean;
  itemToEdit?: MenuItem | null;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  itemToEdit,
  onClose,
  onSuccessToast,
}) => {
  const { categories, addMenuItem, updateMenuItem } = useAppState();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [halfPrice, setHalfPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setCategoryId(itemToEdit.category_id);
      setPrice(String(itemToEdit.price));
      setHalfPrice(itemToEdit.half_price ? String(itemToEdit.half_price) : '');
      setImageUrl(itemToEdit.image_url || '');
    } else {
      setName('');
      setCategoryId(categories[0]?.id || '');
      setPrice('');
      setHalfPrice('');
      setImageUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300');
    }
  }, [itemToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    if (itemToEdit) {
      updateMenuItem(itemToEdit.id, {
        name: name.trim(),
        category_id: categoryId || categories[0]?.id,
        price: Number(price),
        half_price: halfPrice ? Number(halfPrice) : null,
        image_url: imageUrl,
      });
      onSuccessToast('Item updated!');
    } else {
      addMenuItem({
        name: name.trim(),
        category_id: categoryId || categories[0]?.id || 'cat-1',
        price: Number(price),
        half_price: halfPrice ? Number(halfPrice) : null,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
        is_available: true,
        stock: 50,
      });
      onSuccessToast('Item added!');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border border-[#E5E7EB] rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
          <h3 className="font-bold text-base text-[#111827]">
            {itemToEdit ? 'Edit Menu Item' : 'Add Menu Item'}
          </h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#111827]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1 — SELECT MENU */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">SELECT MENU</span>
          <div className="flex items-center space-x-2">
            <button type="button" className="px-3 py-1 bg-[#2563EB] text-white rounded-lg text-xs font-bold shadow-xs">
              Main Menu
            </button>
            <button type="button" className="px-3 py-1 bg-white border border-[#D1D5DB] text-[#4B5563] rounded-lg text-xs font-semibold hover:bg-gray-100 flex items-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>New Menu</span>
            </button>
          </div>
        </div>

        {/* Section 2 — FORM FIELDS */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          
          {/* Field 1: Category */}
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-md text-xs font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Field 2: Item Name */}
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1">Item Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chicken Biryani"
              className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-md text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Field 3: Item Photo */}
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1">Item Photo (optional)</label>
            <label className="border-2 border-dashed border-[#D1D5DB] hover:border-[#2563EB] rounded-xl p-3 flex items-center justify-center space-x-2 cursor-pointer bg-gray-50/50 hover:bg-blue-50/30 transition-colors">
              {imageUrl ? (
                <div className="flex items-center space-x-3">
                  <img src={imageUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-[#E5E7EB]" />
                  <span className="text-xs text-[#2563EB] font-semibold">Change photo</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-xs text-[#9CA3AF]">
                  <Upload className="w-4 h-4 text-[#2563EB]" />
                  <span>Tap to upload photo</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {/* Field 4: Price */}
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1">Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 199"
              className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-md text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Field 5: Half Price / Variant */}
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1">
              Half Price / Variant (optional)
            </label>
            <input
              type="number"
              value={halfPrice}
              onChange={(e) => setHalfPrice(e.target.value)}
              placeholder="e.g. 129 (leave blank if single price)"
              className="w-full px-3 py-2 bg-white border border-[#D1D5DB] rounded-md text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
            >
              {itemToEdit ? 'Save Changes' : 'Save Item'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
