"use client";

import React from 'react';
import { useAppState } from '@/lib/store';
import { Bell, Check, AlertTriangle, ShoppingCart, Wallet, Info } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationsAsRead } = useAppState();

  const getIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-[#4338CA]" />;
      case 'cash':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Notification Center</h1>
          <p className="text-xs text-[#9CA3AF]">
            Real-time alerts for low stock thresholds, kitchen order updates, and cash drawer activities.
          </p>
        </div>

        <button
          onClick={markNotificationsAsRead}
          className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563] hover:bg-[#F9FAFB] flex items-center space-x-1"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 border rounded-2xl flex items-start justify-between space-x-4 transition-all ${
              !notif.read
                ? 'bg-[#EEF2FF]/40 border-indigo-200'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#111827]">{notif.title}</h3>
                <p className="text-xs text-[#4B5563] mt-0.5">{notif.message}</p>
                <span className="text-[11px] text-[#9CA3AF] mt-1 block">{notif.time}</span>
              </div>
            </div>

            {!notif.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#4338CA] shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
