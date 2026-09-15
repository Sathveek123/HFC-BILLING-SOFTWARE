"use client";

import React from 'react';
import { useAppState } from '@/lib/store';
import { Store, Plus, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ItemsStockPage() {
  const { menuItems, updateMenuItem } = useAppState();

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Menu Items Stock Management</h1>
          <p className="text-xs text-[#9CA3AF]">
            Track available portion counts per dish & prevent over-ordering during rush hours.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Dish Name</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Current Portion Stock</th>
              <th className="p-3 font-semibold">Stock Status</th>
              <th className="p-3 font-semibold text-right">Quick Adjust</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => {
              const isLow = item.stock <= 10;
              return (
                <tr key={item.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                  <td className="p-3 font-semibold text-[#111827]">{item.name}</td>
                  <td className="p-3 font-medium text-[#4B5563]">₹{item.price}</td>
                  <td className="p-3 font-bold text-sm text-[#111827]">{item.stock} portions</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center w-fit space-x-1 ${
                      isLow
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {isLow ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      <span>{isLow ? 'Low Stock' : 'In Stock'}</span>
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        onClick={() => updateMenuItem(item.id, { stock: Math.max(0, item.stock - 5) })}
                        className="p-1 rounded-md border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]"
                        title="Reduce by 5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateMenuItem(item.id, { stock: item.stock + 10 })}
                        className="px-2 py-1 rounded-md bg-[#EEF2FF] text-[#4338CA] font-semibold hover:bg-indigo-100"
                        title="Add 10"
                      >
                        +10 Refill
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
