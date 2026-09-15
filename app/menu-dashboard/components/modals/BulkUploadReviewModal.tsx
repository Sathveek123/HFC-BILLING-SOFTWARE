"use client";

import React, { useState, useEffect } from 'react';
import { ExtractedMenuData } from '@/lib/menuAI';
import { X, CheckCircle, Plus, Layers, Sliders } from 'lucide-react';
import { useAppState } from '@/lib/store';
import { AddMenuCardModal } from '@/components/menu/AddMenuCardModal';
import { ConfirmReplaceMenuModal } from '@/components/menu/ConfirmReplaceMenuModal';

interface BulkUploadReviewModalProps {
  isOpen: boolean;
  data: ExtractedMenuData | null;
  onClose: () => void;
  onSave: (categories: ExtractedMenuData['categories'], mode: 'append' | 'replace') => void;
}

export const BulkUploadReviewModal: React.FC<BulkUploadReviewModalProps> = ({
  isOpen,
  data,
  onClose,
  onSave,
}) => {
  const { menus, activeMenu, setActiveMenu, addMenuCard } = useAppState();
  const [categories, setCategories] = useState<ExtractedMenuData['categories']>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('Main Menu');
  const [addMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [confirmReplaceOpen, setConfirmReplaceOpen] = useState(false);

  useEffect(() => {
    if (data?.categories) {
      setCategories(JSON.parse(JSON.stringify(data.categories)));
    }
    if (activeMenu) {
      setSelectedMenu(activeMenu);
    }
  }, [data, activeMenu]);

  if (!isOpen || !data) return null;

  const totalItemsCount = categories.reduce((sum, c) => sum + c.items.length, 0);

  const handleCategoryNameChange = (catIdx: number, newName: string) => {
    setCategories((prev) => {
      const copy = [...prev];
      copy[catIdx].name = newName.toUpperCase();
      return copy;
    });
  };

  const handleItemChange = (
    catIdx: number, 
    itemIdx: number, 
    field: 'name' | 'price' | 'half_price' | 'full_price', 
    value: string | number | null
  ) => {
    setCategories((prev) => {
      const copy = [...prev];
      const targetItem = copy[catIdx].items[itemIdx];
      if (field === 'name') {
        targetItem.name = String(value);
      } else if (field === 'half_price') {
        targetItem.half_price = value === '' || value === null ? null : Number(value);
      } else if (field === 'full_price') {
        targetItem.full_price = value === '' || value === null ? null : Number(value);
        targetItem.price = targetItem.full_price || targetItem.price;
      } else {
        targetItem.price = Number(value);
      }
      return copy;
    });
  };

  const togglePortionPricing = (catIdx: number, itemIdx: number) => {
    setCategories((prev) => {
      const copy = [...prev];
      const item = copy[catIdx].items[itemIdx];
      if (item.half_price !== null && item.half_price !== undefined) {
        item.half_price = null;
        item.full_price = null;
      } else {
        item.half_price = Math.round(item.price * 0.6);
        item.full_price = item.price;
      }
      return copy;
    });
  };

  const handleAddMenuCard = (name: string) => {
    addMenuCard(name);
    setSelectedMenu(name);
  };

  const handleSaveClick = () => {
    onSave(categories, 'append');
  };

  const handleReplaceClick = () => {
    setConfirmReplaceOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white border border-[#E5E7EB] rounded-t-2xl sm:rounded-2xl max-w-2xl w-full h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden font-sans">
          
          {/* Header */}
          <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">Bulk Upload</h2>
              <p className="text-xs text-[#9CA3AF]">Review and Edit ({totalItemsCount} items)</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleReplaceClick}
                className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-full text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer"
              >
                Clear Past Menu & Save
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="px-4 py-1.5 bg-[#2563EB] text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                Save ({totalItemsCount} items)
              </button>
            </div>
          </div>

          {/* SELECT MENU Section matching Image 3 */}
          <div className="px-4 py-3 bg-gray-50 border-b border-[#E5E7EB] shrink-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">SELECT MENU CARD</span>
              <span className="text-[11px] text-[#2563EB] font-semibold">
                {menus.length} Menu Cards Available
              </span>
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {menus.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setSelectedMenu(m);
                    setActiveMenu(m);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedMenu === m
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-100'
                  }`}
                >
                  {m}
                </button>
              ))}

              {/* Working + Add Menu Button */}
              <button
                type="button"
                onClick={() => setAddMenuModalOpen(true)}
                className="px-3 py-1 bg-white border border-[#2563EB] text-[#2563EB] rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors flex items-center space-x-1 shrink-0 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Menu</span>
              </button>
            </div>
          </div>

          {/* Scrollable Items Form */}
          <div className="flex-1 p-4 overflow-y-auto space-y-6">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs space-y-4">
                
                {/* Category Editable Header */}
                <div className="relative pt-1">
                  <label className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider block mb-0.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => handleCategoryNameChange(catIdx, e.target.value)}
                    className="w-full text-base font-bold text-[#2563EB] uppercase bg-blue-50/50 border border-blue-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-1">
                  {cat.items.map((item, itemIdx) => {
                    const hasPortions = item.half_price !== null && item.half_price !== undefined;

                    return (
                      <div key={itemIdx} className="space-y-2 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                        <div className="flex items-center justify-between pb-1">
                          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                            Dish / Item Name
                          </label>
                          <button
                            type="button"
                            onClick={() => togglePortionPricing(catIdx, itemIdx)}
                            className="text-[11px] text-[#2563EB] font-bold hover:underline cursor-pointer flex items-center space-x-1"
                          >
                            <Sliders className="w-3 h-3" />
                            <span>{hasPortions ? 'Disable Portion Pricing' : '+ Add 1 Person / 2 Persons Rates'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                          {/* Item Name */}
                          <div className={hasPortions ? 'sm:col-span-3' : 'sm:col-span-4'}>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleItemChange(catIdx, itemIdx, 'name', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs font-semibold text-[#111827] focus:border-[#2563EB] focus:outline-none"
                            />
                          </div>

                          {/* Pricing Inputs */}
                          {hasPortions ? (
                            <>
                              <div className="sm:col-span-1.5">
                                <label className="text-[10px] font-semibold text-blue-700 block mb-0.5">1 Person (₹)</label>
                                <input
                                  type="number"
                                  value={item.half_price || ''}
                                  onChange={(e) => handleItemChange(catIdx, itemIdx, 'half_price', e.target.value)}
                                  className="w-full px-2 py-1.5 bg-blue-50/60 border border-blue-200 rounded-lg text-xs font-bold text-[#2563EB] focus:border-[#2563EB] focus:outline-none"
                                />
                              </div>
                              <div className="sm:col-span-1.5">
                                <label className="text-[10px] font-semibold text-blue-900 block mb-0.5">2 Persons (₹)</label>
                                <input
                                  type="number"
                                  value={item.full_price || item.price}
                                  onChange={(e) => handleItemChange(catIdx, itemIdx, 'full_price', e.target.value)}
                                  className="w-full px-2 py-1.5 bg-blue-50/60 border border-blue-200 rounded-lg text-xs font-bold text-[#111827] focus:border-[#2563EB] focus:outline-none"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="sm:col-span-2">
                              <label className="text-[10px] font-semibold text-gray-500 block mb-0.5">Price (₹)</label>
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleItemChange(catIdx, itemIdx, 'price', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs font-bold text-[#111827] focus:border-[#2563EB] focus:outline-none"
                              />
                            </div>
                          )}
                        </div>

                        {hasPortions && (
                          <div className="text-[11px] text-[#2563EB] font-semibold pt-0.5">
                            Portion Breakdown: 1 Person (₹{item.half_price}) • 2 Persons (₹{item.full_price || item.price})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* Fixed Bottom Action Buttons */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white grid grid-cols-2 gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 bg-white border border-[#D1D5DB] text-[#4B5563] rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              className="py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              Save ({totalItemsCount} Items)
            </button>
          </div>

        </div>
      </div>

      {/* Modal for creating a new Menu Card tab */}
      <AddMenuCardModal
        isOpen={addMenuModalOpen}
        onClose={() => setAddMenuModalOpen(false)}
        onAddMenuCard={handleAddMenuCard}
      />

      {/* Confirmation Modal before replacing past menu */}
      <ConfirmReplaceMenuModal
        isOpen={confirmReplaceOpen}
        onClose={() => setConfirmReplaceOpen(false)}
        onKeepPastMenu={() => {
          setConfirmReplaceOpen(false);
          onSave(categories, 'append');
        }}
        onReplacePastMenu={() => {
          setConfirmReplaceOpen(false);
          onSave(categories, 'replace');
        }}
      />
    </>
  );
};
