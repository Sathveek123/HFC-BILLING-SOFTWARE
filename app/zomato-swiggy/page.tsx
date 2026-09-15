"use client";

import React, { useState } from 'react';
import { Bike, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ZomatoSwiggyPage() {
  const [autoAccept, setAutoAccept] = useState(true);

  const aggregatorOrders = [
    { id: 'ZOM-88392', platform: 'Zomato', items: '1x HFC Special Chicken Biryani, 1x Mint Lime Soda', total: 320, status: 'Accepting', time: '5 mins ago' },
    { id: 'SWG-94021', platform: 'Swiggy', items: '2x Butter Naan, 1x Butter Chicken Masala', total: 390, status: 'Out for Delivery', time: '18 mins ago' },
    { id: 'ZOM-88380', platform: 'Zomato', items: '1x Mutton Dum Biryani', total: 340, status: 'Delivered', time: '45 mins ago' },
  ];

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Zomato & Swiggy Aggregator Sync</h1>
          <p className="text-xs text-[#9CA3AF]">
            Auto-sync online delivery orders directly into HFC POS kitchen printing queue.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 text-xs font-semibold text-[#111827] cursor-pointer">
            <input
              type="checkbox"
              checked={autoAccept}
              onChange={(e) => setAutoAccept(e.target.checked)}
              className="w-4 h-4 rounded text-[#4338CA] focus:ring-[#4338CA]"
            />
            <span>Auto-Accept Incoming Orders</span>
          </label>
        </div>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Zomato */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center border border-red-200">
              Z
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">Zomato Store Integration</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Connected & Accepting Orders
              </span>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-xs font-semibold rounded-lg hover:bg-[#F9FAFB]">
            Sync Menu
          </button>
        </div>

        {/* Swiggy */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-bold text-sm flex items-center justify-center border border-orange-200">
              S
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#111827]">Swiggy Merchant API</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Connected & Accepting Orders
              </span>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-xs font-semibold rounded-lg hover:bg-[#F9FAFB]">
            Sync Menu
          </button>
        </div>

      </div>

      {/* Live Aggregator Orders Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-[#E5E7EB]">
          <h2 className="font-bold text-sm text-[#111827]">Live Online Aggregator Queue</h2>
        </div>
        
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Aggregator Order #</th>
              <th className="p-3 font-semibold">Platform</th>
              <th className="p-3 font-semibold">Line Items</th>
              <th className="p-3 font-semibold">Total Amount</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {aggregatorOrders.map((ord) => (
              <tr key={ord.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                <td className="p-3 font-bold text-[#111827]">{ord.id}</td>
                <td className="p-3 font-semibold">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                    ord.platform === 'Zomato' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {ord.platform}
                  </span>
                </td>
                <td className="p-3 text-[#4B5563]">{ord.items}</td>
                <td className="p-3 font-bold text-[#111827]">₹{ord.total}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-semibold border border-indigo-200">
                    {ord.status}
                  </span>
                </td>
                <td className="p-3 text-right text-[#9CA3AF]">{ord.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
