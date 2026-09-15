"use client";

import React from 'react';
import { Menu, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 px-4 py-3 flex items-center justify-between lg:hidden">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold text-[#111827] text-base">HFC Billing</span>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          href="/place-order"
          className="px-3 py-1.5 bg-[#4338CA] text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 hover:bg-indigo-800 transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>New Order</span>
        </Link>
      </div>
    </header>
  );
};
