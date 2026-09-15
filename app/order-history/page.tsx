"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { CalendarDays, Search, Eye } from 'lucide-react';
import { ReceiptModal } from '@/components/pos/ReceiptModal';
import { Order } from '@/types';

export default function OrderHistoryPage() {
  const { orders } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch = 
      ord.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer_name && ord.customer_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Order Archive & Billing History</h1>
          <p className="text-xs text-[#9CA3AF]">
            Search past completed bills, print duplicate receipts, and audit transactions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search order # or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#D1D5DB] rounded-lg text-xs focus:outline-none focus:border-[#4338CA]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-x-auto w-full shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Order #</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Items Count</th>
              <th className="p-3 font-semibold">Payment</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Total Amount</th>
              <th className="p-3 font-semibold text-right">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                <td className="p-3 font-bold text-[#111827]">{ord.order_number}</td>
                <td className="p-3 capitalize font-medium text-[#4B5563]">
                  {ord.type} {ord.table_number ? `(T#${ord.table_number})` : ''}
                </td>
                <td className="p-3 text-[#111827]">{ord.customer_name || 'Walk-in Guest'}</td>
                <td className="p-3 text-[#4B5563]">{ord.items.length} items</td>
                <td className="p-3 uppercase text-[11px] font-semibold text-[#4B5563]">{ord.payment_method}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                    ord.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    ord.status === 'cooking' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {ord.status}
                  </span>
                </td>
                <td className="p-3 font-bold text-sm text-[#111827]">₹{ord.total}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedOrder(ord)}
                    className="p-1.5 text-[#4338CA] hover:bg-[#EEF2FF] rounded-lg transition-colors flex items-center space-x-1 ml-auto"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Bill</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReceiptModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

    </div>
  );
}
