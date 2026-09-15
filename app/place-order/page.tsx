"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  Check, 
  Utensils, 
  User, 
  Phone, 
  CreditCard, 
  Wallet, 
  QrCode, 
  Users, 
  Tag, 
  RefreshCw,
  Clock,
  ArrowRight,
  Layers
} from 'lucide-react';
import { MenuItem, Order, OrderType, PaymentMethod } from '@/types';
import { ReceiptModal } from '@/components/pos/ReceiptModal';
import { PortionModal } from '@/components/pos/PortionModal';
import Link from 'next/link';

export default function PlaceOrderPage() {
  const {
    menus,
    activeMenu,
    setActiveMenu,
    categories,
    menuItems,
    tables,
    cart,
    cartOrderType,
    cartTableId,
    cartCustomerName,
    cartCustomerPhone,
    cartDiscount,
    cartTaxPercent,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    setCartOrderType,
    setCartTableId,
    setCartCustomerName,
    setCartCustomerPhone,
    setCartDiscount,
    placeCurrentOrder,
  } = useAppState();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<Order | null>(null);

  // Portion Modal state
  const [portionItem, setPortionItem] = useState<MenuItem | null>(null);
  const [portionModalOpen, setPortionModalOpen] = useState(false);

  // Filter menu items by active menu card, category and search
  const menuCardItems = menuItems.filter((m) => !m.menu_card || m.menu_card === activeMenu);

  const filteredItems = menuCardItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate cart subtotal, tax, total
  const subtotal = cart.reduce((sum, c) => {
    const price = c.variant === 'half' && c.item.half_price ? c.item.half_price : c.item.price;
    return sum + price * c.qty;
  }, 0);
  const tax = Math.round((subtotal * cartTaxPercent) / 100);
  const grandTotal = Math.max(0, subtotal + tax - cartDiscount);

  const handleCheckout = (method: PaymentMethod) => {
    if (cart.length === 0) return;
    const newOrder = placeCurrentOrder(method);
    setActiveReceipt(newOrder);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.half_price) {
      // Portion item -> Open Portion modal
      setPortionItem(item);
      setPortionModalOpen(true);
    } else {
      // Single portion item -> Add directly
      addToCart(item, 'full');
    }
  };

  const handleConfirmPortion = (item: MenuItem, variant: 'half' | 'full', variantLabel: string) => {
    addToCart(item, variant, variantLabel);
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] flex flex-col lg:flex-row gap-6 bg-white overflow-hidden font-sans">
      
      {/* LEFT: Menu Grid & Controls */}
      <div className="flex-1 flex flex-col min-w-0 bg-white space-y-4 overflow-y-auto pr-1">
        
        {/* FREE FLOWING HEADER & FILTER SYSTEM CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3.5 shadow-xs">
          
          {/* Row 1: Title & Search bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#111827] tracking-tight">Place Order (POS)</h1>
              <p className="text-xs text-[#6B7280]">Select menu items to build bill</p>
            </div>

            {menuItems.length > 0 && (
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search dishes or items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#111827] focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#9CA3AF]"
                />
              </div>
            )}
          </div>

          {/* Row 2: Menu Cards Switcher Tabs */}
          {menus.length > 1 && (
            <div className="flex items-center space-x-2 pt-2 border-t border-[#F3F4F6]">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider shrink-0 flex items-center space-x-1 pr-1">
                <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Menu Card:</span>
              </span>
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-xs scale-[1.01]'
                          : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827]'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Row 3: Free-Flowing Category Pills Bar */}
          {menuCardItems.length > 0 && (
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
                  <span>All Items</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {menuCardItems.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const count = menuCardItems.filter((m) => m.category_id === cat.id).length;
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
          )}

        </div>

        {/* Menu Items Grid OR Empty State */}
        {menuItems.length === 0 ? (
          <div className="flex-1 border border-[#E5E7EB] rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto min-h-[350px]">
            <div className="w-16 h-16 rounded-full bg-[#EEF2FF] text-[#2563EB] border border-blue-100 flex items-center justify-center shadow-xs">
              <Utensils className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h2 className="text-lg font-bold text-[#111827]">No menu items yet</h2>
              <p className="text-xs text-[#9CA3AF]">
                Upload a menu card photo or create items in the Menu Dashboard to start taking customer orders.
              </p>
            </div>
            <Link
              href="/menu-dashboard"
              className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2 shadow-xs cursor-pointer"
            >
              <span>Go to Menu Dashboard to add your items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-6 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between hover:border-indigo-200 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between space-x-2">
                    <h3 className="font-semibold text-sm text-[#111827] line-clamp-2">{item.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      Stock: {item.stock}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    {item.half_price ? (
                      <div>
                        <div className="text-base font-bold text-[#111827]">₹{item.half_price} / ₹{item.price}</div>
                        <div className="text-[11px] text-[#2563EB] font-semibold">1 Person: ₹{item.half_price} • 2 Persons: ₹{item.price}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-base font-bold text-[#111827]">₹{item.price}</div>
                        <div className="text-[11px] text-[#9CA3AF] font-medium">1 Person: ₹{item.price}</div>
                      </div>
                    )}
                  </div>

                  {/* Add Buttons */}
                  <div className="flex items-center space-x-1.5">
                    {item.half_price ? (
                      <>
                        <button
                          onClick={() => addToCart(item, 'half', '1 Person')}
                          className="px-2.5 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#4338CA] hover:text-[#4338CA] text-[#4B5563] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + 1 Person (₹{item.half_price})
                        </button>
                        <button
                          onClick={() => {
                            setPortionItem(item);
                            setPortionModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#4338CA] text-white rounded-lg text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 'full', '1 Person')}
                        className="px-3.5 py-1.5 bg-[#4338CA] text-white rounded-lg text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-[#9CA3AF]">
                No menu items match your filter.
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Active Cart & Billing Panel */}
      <div className="w-full lg:w-[380px] bg-white border border-[#E5E7EB] rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs shrink-0">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-[#E5E7EB] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-[#4338CA]" />
              <h2 className="font-bold text-base text-[#111827]">Current Order</h2>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Order Type Switcher (Dine-in, Takeaway, Delivery) */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            {(['dine-in', 'takeaway', 'delivery'] as OrderType[]).map((type) => (
              <button
                key={type}
                onClick={() => setCartOrderType(type)}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  cartOrderType === type
                    ? 'bg-white text-[#4338CA] shadow-xs border border-[#E5E7EB]'
                    : 'text-[#9CA3AF] hover:text-[#4B5563]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Table selector (if Dine-in) */}
          {cartOrderType === 'dine-in' && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#4B5563] shrink-0">Table:</span>
              <select
                value={cartTableId || ''}
                onChange={(e) => setCartTableId(e.target.value || null)}
                className="flex-1 px-3 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs font-medium text-[#111827] focus:outline-none focus:border-[#4338CA]"
              >
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    Table #{t.table_number} {t.is_occupied ? '(Occupied)' : '(Available)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Customer Inputs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <input
              type="text"
              placeholder="Guest Name"
              value={cartCustomerName}
              onChange={(e) => setCartCustomerName(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs text-[#111827] focus:outline-none focus:border-[#4338CA]"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={cartCustomerPhone}
              onChange={(e) => setCartCustomerPhone(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs text-[#111827] focus:outline-none focus:border-[#4338CA]"
            />
          </div>
        </div>

        {/* Cart Line Items */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
          {cart.map((line, idx) => {
            const unitPrice = line.variant === 'half' && line.item.half_price ? line.item.half_price : line.item.price;
            const lineTotal = unitPrice * line.qty;

            return (
              <div
                key={`${line.item.id}-${line.variant}-${idx}`}
                className="flex items-center justify-between p-2.5 border border-[#E5E7EB] rounded-xl bg-white"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-semibold text-[#111827] truncate">
                    {line.item.name}
                  </div>
                  <div className="text-[11px] text-[#9CA3AF]">
                    {line.variantLabel || (line.variant === 'half' ? '1 Person' : '2 Persons')} • ₹{unitPrice}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => updateCartQty(line.item.id, line.variant, -1)}
                    className="w-6 h-6 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:bg-[#F9FAFB]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-[#111827] w-4 text-center">
                    {line.qty}
                  </span>
                  <button
                    onClick={() => updateCartQty(line.item.id, line.variant, 1)}
                    className="w-6 h-6 rounded-md border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:bg-[#F9FAFB]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>

                  <span className="text-xs font-bold text-[#111827] w-14 text-right">
                    ₹{lineTotal}
                  </span>
                </div>
              </div>
            );
          })}

          {cart.length === 0 && (
            <div className="h-40 flex flex-col items-center justify-center text-center text-[#9CA3AF] space-y-2">
              <ShoppingCart className="w-8 h-8 text-gray-300" />
              <p className="text-xs">No items in order yet.</p>
            </div>
          )}
        </div>

        {/* Bill Summary & Payment Actions */}
        <div className="p-4 border-t border-[#E5E7EB] bg-white space-y-3">
          
          {/* Subtotal, Tax, Discount */}
          <div className="space-y-1.5 text-xs text-[#4B5563]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#111827]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-semibold text-[#111827]">₹{tax}</span>
            </div>
            
            {/* Discount input row */}
            <div className="flex justify-between items-center pt-1">
              <span className="flex items-center space-x-1 text-[#9CA3AF]">
                <Tag className="w-3.5 h-3.5" />
                <span>Discount (₹)</span>
              </span>
              <input
                type="number"
                min="0"
                value={cartDiscount || ''}
                onChange={(e) => setCartDiscount(Number(e.target.value))}
                placeholder="0"
                className="w-20 px-2 py-1 text-right bg-white border border-[#D1D5DB] rounded-md text-xs font-semibold focus:outline-none focus:border-[#4338CA]"
              />
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center text-base font-bold text-[#111827] pt-2 border-t border-[#E5E7EB]">
              <span>Total Payable</span>
              <span className="text-[#4338CA]">₹{grandTotal}</span>
            </div>
          </div>

          {/* Payment Method Action Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              disabled={cart.length === 0}
              onClick={() => handleCheckout('cash')}
              className="h-10 bg-[#4338CA] text-[#FFFFFF] rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>Cash Pay</span>
            </button>

            <button
              disabled={cart.length === 0}
              onClick={() => handleCheckout('upi')}
              className="h-10 bg-white border border-[#111827] text-[#111827] rounded-xl text-xs font-semibold hover:bg-[#F9FAFB] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <QrCode className="w-4 h-4" />
              <span>UPI / QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portion Selection Modal for Half/Full portion items */}
      <PortionModal
        item={portionItem}
        isOpen={portionModalOpen}
        onClose={() => setPortionModalOpen(false)}
        onConfirm={handleConfirmPortion}
      />

      {/* Thermal Printable Receipt Modal */}
      <ReceiptModal order={activeReceipt} onClose={() => setActiveReceipt(null)} />
    </div>
  );
}
