"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Menu as MenuIcon, Share2, ChevronDown, CheckCircle2, Plus, Layers } from 'lucide-react';
import { MenuItem, MenuCategory } from '@/types';
import { CategorySection } from './components/CategorySection';
import { BottomActionBar } from './components/BottomActionBar';

// Modals
import { BulkUploadMethodModal } from './components/modals/BulkUploadMethodModal';
import { ReviewPhotosScreen } from './components/modals/ReviewPhotosScreen';
import { ProcessingScreen } from './components/modals/ProcessingScreen';
import { BulkUploadReviewModal } from './components/modals/BulkUploadReviewModal';
import { AddCategoryModal } from './components/modals/AddCategoryModal';
import { AddItemModal } from './components/modals/AddItemModal';
import { AddMenuCardModal } from '@/components/menu/AddMenuCardModal';
import { Toast } from '@/components/ui/Toast';

import { extractMenuFromImage } from '@/lib/extractMenu';
import { ExtractedMenuData } from '@/lib/menuAI';

export default function MenuDashboardPage() {
  const { menus, activeMenu, setActiveMenu, addMenuCard, categories, menuItems, bulkSaveExtractedItems } = useAppState();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals visibility
  const [uploadMethodOpen, setUploadMethodOpen] = useState(false);
  const [reviewPhotosOpen, setReviewPhotosOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [processingOpen, setProcessingOpen] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedMenuData | null>(null);
  const [bulkReviewOpen, setBulkReviewOpen] = useState(false);

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [addMenuCardOpen, setAddMenuCardOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<MenuItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Upload Step 1 -> Step 2
  const handleSelectPhoto = (file: File) => {
    setSelectedImageFile(file);
    setUploadMethodOpen(false);
    setReviewPhotosOpen(true);
  };

  // Upload Step 2 -> Step 3 -> Step 4 (Google Gemini 1.5 Flash Vision API Call)
  const handleProcessPhoto = async () => {
    if (!selectedImageFile) return;

    setReviewPhotosOpen(false);
    setProcessingOpen(true);

    try {
      const resultData = await extractMenuFromImage(selectedImageFile);
      setExtractedData(resultData);
      setProcessingOpen(false);
      setBulkReviewOpen(true);
    } catch (err: any) {
      console.error(err);
      setProcessingOpen(false);
      showToast(err.message || 'Could not extract menu photo with Gemini API. Try again.');
    }
  };

  // Bulk Save extracted AI items
  const handleBulkSave = (extractedCategories: ExtractedMenuData['categories'], mode: 'append' | 'replace' = 'append') => {
    const totalCount = extractedCategories.reduce((sum, c) => sum + c.items.length, 0);
    bulkSaveExtractedItems(extractedCategories, mode);
    setBulkReviewOpen(false);
    setSelectedImageFile(null);
    setExtractedData(null);
    if (mode === 'replace') {
      showToast(`Past menu cleared! ${totalCount} new items saved.`);
    } else {
      showToast(`${totalCount} items added to your menu!`);
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setItemToEdit(item);
    setAddItemOpen(true);
  };

  const handleAddMenuCard = (name: string) => {
    addMenuCard(name);
    showToast(`New Menu Card "${name}" created!`);
  };

  // Filter categories
  const displayedCategories = categories.filter(
    (c) => selectedCategory === 'all' || c.id === selectedCategory
  );

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      
      {/* HEADER ROW */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-4">
        <div className="flex items-center space-x-3">
          <button className="lg:hidden p-1 rounded-md text-[#111827]">
            <MenuIcon className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Menu Management</h1>
            <p className="text-xs text-[#9CA3AF]">Manage menu cards, categories and dishes</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setAddMenuCardOpen(true)}
            className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-[#2563EB] rounded-full text-xs font-bold hover:bg-blue-100 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Menu Card</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Menu link copied to clipboard!')}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Menu</span>
          </button>
        </div>
      </div>

      {/* MENU CARDS SELECTOR & CATEGORY PILLS CARD */}
      <div className="mb-5 bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3.5 shadow-xs">
        
        {/* Menu Cards Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#2563EB]" />
            <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Active Menu Card:</h2>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {menus.map((m) => {
              const isActive = activeMenu === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setActiveMenu(m);
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs scale-[1.01]'
                      : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827]'
                  }`}
                >
                  {m}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setAddMenuCardOpen(true)}
              className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-[#2563EB] rounded-full text-xs font-bold hover:bg-blue-100 transition-colors flex items-center space-x-1 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Menu</span>
            </button>
          </div>
        </div>

        {/* Free-Flowing Category Pills Row */}
        <div className="pt-2 border-t border-[#F3F4F6]">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center space-x-1.5 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#2563EB] text-white shadow-xs scale-[1.01]'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]'
              }`}
            >
              <span>All Categories</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}
              >
                {menuItems.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = menuItems.filter((m) => m.category_id === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center space-x-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs scale-[1.01]'
                      : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* MAIN CONTENT: CATEGORY SECTIONS */}
      <div className="space-y-4">
        {displayedCategories.map((category) => {
          const categoryItems = menuItems.filter((item) => item.category_id === category.id);
          return (
            <CategorySection
              key={category.id}
              category={category}
              items={categoryItems}
              onEditItem={handleEditItem}
            />
          );
        })}

        {displayedCategories.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#E5E7EB] rounded-2xl space-y-2">
            <h3 className="font-bold text-base text-[#111827]">No Menu Categories Found</h3>
            <p className="text-xs text-[#9CA3AF]">Tap "+ Category" or "Upload" to populate your restaurant menu.</p>
          </div>
        )}
      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      <BottomActionBar
        onOpenUpload={() => setUploadMethodOpen(true)}
        onOpenCategory={() => setAddCategoryOpen(true)}
        onOpenAddItem={() => {
          setItemToEdit(null);
          setAddItemOpen(true);
        }}
      />

      {/* FEATURE 1: AI UPLOAD MODALS */}
      <BulkUploadMethodModal
        isOpen={uploadMethodOpen}
        onClose={() => setUploadMethodOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />

      <ReviewPhotosScreen
        isOpen={reviewPhotosOpen}
        imageFile={selectedImageFile}
        onBack={() => {
          setReviewPhotosOpen(false);
          setUploadMethodOpen(true);
        }}
        onProcess={handleProcessPhoto}
      />

      <ProcessingScreen isOpen={processingOpen} />

      <BulkUploadReviewModal
        isOpen={bulkReviewOpen}
        data={extractedData}
        onClose={() => setBulkReviewOpen(false)}
        onSave={handleBulkSave}
      />

      {/* FEATURE 2: CREATE CATEGORY MODAL */}
      <AddCategoryModal
        isOpen={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}
        onSuccessToast={showToast}
      />

      {/* FEATURE 3: ADD/EDIT ITEM MODAL */}
      <AddItemModal
        isOpen={addItemOpen}
        itemToEdit={itemToEdit}
        onClose={() => {
          setAddItemOpen(false);
          setItemToEdit(null);
        }}
        onSuccessToast={showToast}
      />

      {/* FEATURE 4: ADD MENU CARD MODAL */}
      <AddMenuCardModal
        isOpen={addMenuCardOpen}
        onClose={() => setAddMenuCardOpen(false)}
        onAddMenuCard={handleAddMenuCard}
      />

      {/* BOTTOM RIGHT TOAST NOTIFICATION */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

    </div>
  );
}
