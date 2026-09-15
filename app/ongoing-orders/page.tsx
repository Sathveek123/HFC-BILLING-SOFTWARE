"use client";

import React from 'react';
import { useAppState } from '@/lib/store';
import { Clock, CheckCircle2, Utensils, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { OrderStatus } from '@/types';

export default function OngoingOrdersPage() {
  const { orders, updateOrderStatus } = useAppState();

  const activeOrders = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cooking':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'served':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Ongoing Kitchen & Dining Orders</h1>
          <p className="text-xs text-[#9CA3AF]">
            Track live order status, kitchen prep times, and table dispatch status.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-[#4B5563]">
          <span className="font-semibold text-[#4338CA]">{activeOrders.length}</span> active orders in progress
        </div>
      </div>

      {/* Grid of Active Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-200 transition-all"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#111827]">{ord.order_number}</h3>
                  <p className="text-xs text-[#9CA3AF] capitalize">
                    {ord.type} {ord.table_number ? `• Table #${ord.table_number}` : ''}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getStatusColor(ord.status)}`}>
                  {ord.status}
                </span>
              </div>

              {/* Items List */}
              <div className="py-3 space-y-2">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-[#111827]">
                    <span className="font-medium">
                      {item.qty}x {item.item_name} {item.variant === 'half' ? '(Half)' : ''}
                    </span>
                    <span className="text-[#9CA3AF]">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Progression Controls */}
            <div className="pt-3 border-t border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#111827]">
                <span>Total: ₹{ord.total}</span>
                <span className="text-[#9CA3AF] capitalize">Pay: {ord.payment_method}</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => updateOrderStatus(ord.id, 'cooking')}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    ord.status === 'cooking'
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
                  }`}
                >
                  Cooking
                </button>
                <button
                  onClick={() => updateOrderStatus(ord.id, 'served')}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    ord.status === 'served'
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold'
                      : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
                  }`}
                >
                  Served
                </button>
                <button
                  onClick={() => updateOrderStatus(ord.id, 'completed')}
                  className="py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Complete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeOrders.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white border border-[#E5E7EB] rounded-2xl space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-base text-[#111827]">All Orders Completed!</h3>
            <p className="text-xs text-[#9CA3AF]">There are no pending or cooking orders in the kitchen.</p>
          </div>
        )}
      </div>

    </div>
  );
}
