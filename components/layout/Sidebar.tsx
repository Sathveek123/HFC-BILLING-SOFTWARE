"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart2, 
  ShoppingCart, 
  LayoutDashboard, 
  QrCode, 
  Utensils, 
  Store, 
  Archive, 
  Wallet, 
  Receipt, 
  Users, 
  Users2, 
  BarChart, 
  CalendarDays, 
  Megaphone, 
  Bike, 
  Bell, 
  Phone, 
  Settings, 
  ChevronDown, 
  LogOut, 
  User, 
  X,
  Building2
} from 'lucide-react';
import { useAppState } from '@/lib/store';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();
  const { notifications } = useAppState();
  const unreadCount = notifications.filter(n => !n.read).length;

  const [profileDropdown, setProfileDropdown] = useState(false);

  const navSections = [
    {
      label: null,
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { name: 'Place Order', path: '/place-order', icon: ShoppingCart },
        { name: 'Ongoing Orders', path: '/ongoing-orders', icon: LayoutDashboard },
        { name: 'Table QR', path: '/table-qr', icon: QrCode },
      ]
    },
    {
      label: 'CATALOG & INVENTORY',
      items: [
        { name: 'Menu Dashboard', path: '/menu-dashboard', icon: Utensils },
        { name: 'Items Stock', path: '/items-stock', icon: Store },
        { name: 'Raw Materials', path: '/raw-materials', icon: Archive },
      ]
    },
    {
      label: 'MONEY',
      items: [
        { name: 'Cash Drawer', path: '/cash-drawer', icon: Wallet },
        { name: 'Expenses', path: '/expenses', icon: Receipt },
        { name: 'Due & Customers', path: '/due-customers', icon: Users },
      ]
    },
    {
      label: 'STAFF & CHEF',
      items: [
        { name: 'Employees', path: '/employees', icon: Users2 },
      ]
    },
    {
      label: 'REPORTS',
      items: [
        { name: 'Sales Reports', path: '/sales-reports', icon: BarChart },
        { name: 'Order History', path: '/order-history', icon: CalendarDays },
      ]
    },
    {
      label: 'GROW YOUR BUSINESS',
      items: [
        { name: 'Marketing', path: '/marketing', icon: Megaphone },
        { name: 'Zomato & Swiggy', path: '/zomato-swiggy', icon: Bike },
      ]
    },
  ];

  const bottomNavItems = [
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { name: 'Contact HFC', path: '/contact', icon: Phone },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="w-[280px] bg-white border-r border-[#E5E7EB] h-full flex flex-col justify-between overflow-y-auto select-none">
      <div>
        {/* Restaurant Header & Profile Dropdown */}
        <div className="p-4 border-b border-[#E5E7EB] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo Avatar */}
              <img src="/logo.jpg" alt="HFC Logo" className="w-10 h-10 rounded-xl object-cover border border-[#E5E7EB] shadow-xs" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#111827] truncate">HFC RESTAURANT</span>
                <span className="text-[11px] font-semibold text-[#2563EB] truncate">TINDI KLUBB</span>
              </div>
            </div>
            
            <button 
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="p-1 rounded-md hover:bg-[#F9FAFB] text-[#4B5563] transition-colors"
              title="Account Options"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Dropdown */}
          {profileDropdown && (
            <div className="absolute left-4 right-4 top-16 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 py-1 font-sans">
              <Link 
                href="/settings" 
                onClick={() => setProfileDropdown(false)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-[#4B5563] hover:bg-[#F9FAFB]"
              >
                <User className="w-4 h-4 text-[#9CA3AF]" />
                <span>Restaurant Profile</span>
              </Link>
              <Link 
                href="/login" 
                onClick={() => setProfileDropdown(false)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Owner</span>
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Section Items */}
        <nav className="px-3 py-2">
          {navSections.map((section, idx) => (
            <div key={idx} className={section.label ? 'mt-6' : 'mt-2'}>
              {section.label && (
                <div 
                  className="px-3 text-[#9CA3AF] font-semibold tracking-wider uppercase mb-2"
                  style={{ fontSize: '11px', letterSpacing: '0.08em' }}
                >
                  {section.label}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen && setMobileOpen(false)}
                      className={`h-[40px] px-3 rounded-lg flex items-center space-x-3 transition-colors text-sm font-medium ${
                        isActive
                          ? 'bg-[#EEF2FF] text-[#4338CA]'
                          : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                      }`}
                    >
                      <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#4338CA]' : 'text-[#9CA3AF]'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Fixed Section */}
      <div className="p-3 border-t border-[#E5E7EB] bg-white sticky bottom-0 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={`h-[40px] px-3 rounded-lg flex items-center justify-between transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-[#EEF2FF] text-[#4338CA]'
                  : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#4338CA]' : 'text-[#9CA3AF]'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs" 
            onClick={() => setMobileOpen && setMobileOpen(false)} 
          />
          {/* Drawer content */}
          <div className="relative z-10 h-full">
            <button
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="absolute top-4 right-[-44px] p-2 bg-white rounded-r-md text-[#4B5563]"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
