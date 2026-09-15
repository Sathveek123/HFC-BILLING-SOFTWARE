"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { BarChart, Calendar, TrendingUp, Download, PieChart } from 'lucide-react';

export default function SalesReportsPage() {
  const { orders } = useAppState();
  const [dateFilter, setDateFilter] = useState('today');

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalTax = orders.reduce((sum, o) => sum + o.tax, 0);
  const totalDiscount = orders.reduce((sum, o) => sum + o.discount, 0);

  const cashSales = orders.filter((o) => o.payment_method === 'cash').reduce((sum, o) => sum + o.total, 0);
  const upiSales = orders.filter((o) => o.payment_method === 'upi').reduce((sum, o) => sum + o.total, 0);
  const cardSales = orders.filter((o) => o.payment_method === 'card').reduce((sum, o) => sum + o.total, 0);

  const dineInSales = orders.filter((o) => o.type === 'dine-in').reduce((sum, o) => sum + o.total, 0);
  const takeawaySales = orders.filter((o) => o.type === 'takeaway').reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Sales & Revenue Analytics Reports</h1>
          <p className="text-xs text-[#9CA3AF]">
            Detailed financial metrics, GST tax collected, discount reports, and channel breakdowns.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#D1D5DB] rounded-xl text-xs font-semibold text-[#111827] focus:outline-none"
          >
            <option value="today">Today's Sales</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-[#9CA3AF] uppercase">Gross Revenue</span>
          <div className="text-2xl font-bold text-[#4338CA] mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <span className="text-xs text-[#9CA3AF] mt-1 block">From {orders.length} total orders</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-[#9CA3AF] uppercase">GST Tax Collected (5%)</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">₹{totalTax.toLocaleString('en-IN')}</div>
          <span className="text-xs text-[#9CA3AF] mt-1 block">Tax ledger export ready</span>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-[#9CA3AF] uppercase">Discounts Given</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">₹{totalDiscount.toLocaleString('en-IN')}</div>
          <span className="text-xs text-[#9CA3AF] mt-1 block">Promotional discounts</span>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Payment Methods Breakdown */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#111827] border-b border-[#E5E7EB] pb-3">
            Revenue by Payment Method
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#111827]">Cash Payments</span>
              <span className="font-bold text-[#4338CA]">₹{cashSales.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-[#EEF2FF] h-2 rounded-full overflow-hidden">
              <div className="bg-[#4338CA] h-full" style={{ width: `${totalRevenue ? (cashSales / totalRevenue) * 100 : 0}%` }} />
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="font-semibold text-[#111827]">UPI / PhonePe / GPay</span>
              <span className="font-bold text-[#4338CA]">₹{upiSales.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-[#EEF2FF] h-2 rounded-full overflow-hidden">
              <div className="bg-[#4338CA] h-full" style={{ width: `${totalRevenue ? (upiSales / totalRevenue) * 100 : 0}%` }} />
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="font-semibold text-[#111827]">Card / POS Terminal</span>
              <span className="font-bold text-[#4338CA]">₹{cardSales.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-[#EEF2FF] h-2 rounded-full overflow-hidden">
              <div className="bg-[#4338CA] h-full" style={{ width: `${totalRevenue ? (cardSales / totalRevenue) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        {/* Order Channel Breakdown */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#111827] border-b border-[#E5E7EB] pb-3">
            Revenue by Order Channel
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#111827]">Dine-In Tables</span>
              <span className="font-bold text-[#111827]">₹{dineInSales.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full" style={{ width: `${totalRevenue ? (dineInSales / totalRevenue) * 100 : 0}%` }} />
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="font-semibold text-[#111827]">Takeaway & Counter Pickup</span>
              <span className="font-bold text-[#111827]">₹{takeawaySales.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full" style={{ width: `${totalRevenue ? (takeawaySales / totalRevenue) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
