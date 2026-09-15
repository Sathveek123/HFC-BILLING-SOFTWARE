"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { 
  TrendingUp, 
  ShoppingCart, 
  Clock, 
  Utensils, 
  Plus, 
  ArrowRight, 
  Wallet, 
  Receipt,
  Users,
  AlertTriangle,
  RefreshCw,
  Calendar as CalendarIcon,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { orders, menuItems, rawMaterials, tables, cashDrawer, expenses } = useAppState();

  const [dateMode, setDateMode] = useState<'day' | 'month' | 'year'>('day');
  const [selectedDate, setSelectedDate] = useState('15 Sept 2026');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Metrics
  const todayOrders = orders;
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = todayOrders.filter((o) => o.status === 'pending' || o.status === 'cooking');
  const occupiedTables = tables.filter((t) => t.is_occupied).length;

  const lowStockMaterials = rawMaterials.filter((rm) => rm.quantity <= rm.min_threshold);

  // Cash drawer metrics
  const cashIn = cashDrawer.filter(c => c.type === 'in').reduce((sum, c) => sum + c.amount, 0);
  const cashOut = cashDrawer.filter(c => c.type === 'out').reduce((sum, c) => sum + c.amount, 0);
  const openingFloat = 3000;
  const closingBalance = openingFloat + cashIn - cashOut;

  // Expenses breakdown
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const rawMatExp = expenses.filter(e => e.category === 'Raw Materials').reduce((sum, e) => sum + e.amount, 0);
  const employeeExp = expenses.filter(e => e.category === 'Staff Expenses' || e.category === 'Utilities').reduce((sum, e) => sum + e.amount, 0);
  const regularExp = expenses.filter(e => e.category === 'Supplies' || e.category === 'Maintenance').reduce((sum, e) => sum + e.amount, 0);

  // Business summary
  const estProfit = todayRevenue - totalExpensesAmount;
  const averageBill = todayOrders.length > 0 ? Math.round(todayRevenue / todayOrders.length) : 0;

  return (
    <div className="space-y-6 bg-white max-w-7xl mx-auto">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">HFC Dashboard</h1>
          <p className="text-sm text-[#9CA3AF]">
            Real-time overview of your restaurant sales, active orders, and inventory.
          </p>
        </div>
        <div>
          <Link
            href="/place-order"
            className="px-4 py-2.5 bg-[#4338CA] text-white rounded-xl text-sm font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center space-x-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ New POS Bill</span>
          </Link>
        </div>
      </div>

      {/* 2. SECTION 1 — DATE FILTER BAR */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Toggle group */}
            <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-[#E5E7EB]">
              {(['day', 'month', 'year'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDateMode(mode)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    dateMode === mode
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#D1D5DB] hover:bg-gray-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Date Picker Pill */}
            <div className="px-4 py-1.5 border border-blue-200 text-[#2563EB] rounded-full text-xs font-semibold flex items-center space-x-1.5 bg-blue-50/50">
              <span>{selectedDate}</span>
              <CalendarIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-[#4B5563] transition-all ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Refresh Dashboard Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. SECTION 2 — STAT CARDS (4 across) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 — TODAY'S REVENUE */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">TODAY'S REVENUE</span>
            <div className="text-2xl font-bold text-[#111827] mt-1">₹{todayRevenue.toLocaleString('en-IN')}</div>
            <span className="text-xs text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" /> +12.4% vs yesterday
            </span>
          </div>
          <div className="w-11 h-11 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#4338CA]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 — TOTAL ORDERS */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">TOTAL ORDERS</span>
            <div className="text-2xl font-bold text-[#111827] mt-1">{todayOrders.length}</div>
            <span className="text-xs text-[#9CA3AF] font-medium mt-1">Live order logs</span>
          </div>
          <div className="w-11 h-11 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#4338CA]">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 — ACTIVE KITCHEN ORDERS */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">ACTIVE KITCHEN ORDERS</span>
            <div className="text-2xl font-bold text-[#111827] mt-1">{pendingOrders.length}</div>
            <span className="text-xs text-orange-600 font-medium mt-1">Cooking / Preparing</span>
          </div>
          <div className="w-11 h-11 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 — OCCUPIED TABLES */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">OCCUPIED TABLES</span>
            <div className="text-2xl font-bold text-[#111827] mt-1">{occupiedTables} / {tables.length}</div>
            <span className="text-xs text-[#9CA3AF] font-medium mt-1">Dine-in status</span>
          </div>
          <div className="w-11 h-11 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#4338CA]">
            <Utensils className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. SECTION 3 — INVENTORY ALERT BANNER */}
      {lowStockMaterials.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-amber-900">Inventory Alert: Low Raw Materials</h3>
              <p className="text-xs font-semibold text-amber-700 mt-0.5">
                {lowStockMaterials.map(m => `${m.name} (${m.quantity} ${m.unit})`).join(', ')}
              </p>
            </div>
          </div>
          <Link
            href="/raw-materials"
            className="px-3.5 py-1.5 bg-white border border-amber-300 text-amber-900 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors shrink-0 text-center"
          >
            Refill Inventory
          </Link>
        </div>
      )}

      {/* 5. SECTION 4 — QUICK ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/place-order"
          className="p-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#111827]">Place Order</div>
            <div className="text-xs text-[#9CA3AF]">POS Screen</div>
          </div>
        </Link>

        <Link
          href="/cash-drawer"
          className="p-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#111827]">Cash Ledger</div>
            <div className="text-xs text-[#9CA3AF]">In / Out Flow</div>
          </div>
        </Link>

        <Link
          href="/expenses"
          className="p-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#111827]">Log Expense</div>
            <div className="text-xs text-[#9CA3AF]">Record Costs</div>
          </div>
        </Link>

        <Link
          href="/menu-dashboard"
          className="p-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#111827]">Menu Manager</div>
            <div className="text-xs text-[#9CA3AF]">Items & Prices</div>
          </div>
        </Link>
      </div>

      {/* 6, 7, 8. FINANCIAL OVERVIEW CARDS (Cash Drawer, Business Summary, Expenses Breakdown) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* SECTION 5 — CASH DRAWER CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💰</span>
              <h3 className="font-bold text-sm text-[#111827]">Cash Drawer</h3>
            </div>
            <Link href="/cash-drawer" className="text-xs text-[#9CA3AF] hover:text-[#111827] flex items-center space-x-0.5">
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center py-1">
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Opening</div>
              <div className="text-sm font-bold text-[#111827] mt-1">₹{openingFloat}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Cash In</div>
              <div className="text-sm font-bold text-[#16A34A] mt-1">₹{cashIn}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Cash Out</div>
              <div className="text-sm font-bold text-[#DC2626] mt-1">₹{cashOut}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Closing</div>
              <div className="text-sm font-bold text-[#111827] mt-1">₹{closingBalance}</div>
            </div>
          </div>
        </div>

        {/* SECTION 6 — BUSINESS SUMMARY CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📊</span>
              <h3 className="font-bold text-sm text-[#111827]">Business Summary</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center py-1">
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Sales</div>
              <div className="text-sm font-bold text-[#16A34A] mt-1">₹{todayRevenue.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Expenses</div>
              <div className="text-sm font-bold text-[#DC2626] mt-1">₹{totalExpensesAmount.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#9CA3AF] font-medium">Est. Profit</div>
              <div className={`text-sm font-bold mt-1 ${estProfit >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                ₹{estProfit.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>{todayOrders.length} settled bills</span>
            <span>Average bill ₹{averageBill}</span>
          </div>
        </div>

        {/* SECTION 7 — EXPENSES BREAKDOWN CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🧾</span>
              <h3 className="font-bold text-sm text-[#111827]">Expenses</h3>
            </div>
            <Link href="/expenses" className="text-xs text-[#9CA3AF] hover:text-[#111827]">
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between pb-1 border-b border-[#F3F4F6] text-[#4B5563]">
              <span>Raw Material</span>
              <span className="font-semibold text-[#111827]">₹{rawMatExp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-[#F3F4F6] text-[#4B5563]">
              <span>Employee / Utilities</span>
              <span className="font-semibold text-[#111827]">₹{employeeExp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-1 border-b border-[#F3F4F6] text-[#4B5563]">
              <span>Regular / Supplies</span>
              <span className="font-semibold text-[#111827]">₹{regularExp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-sm text-[#111827]">
              <span>Total</span>
              <span>₹{totalExpensesAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 9. SECTION 8 — RECENT CUSTOMER ORDERS TABLE */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="font-bold text-base text-[#111827]">Recent Customer Orders</h2>
          <Link
            href="/order-history"
            className="text-xs text-[#4338CA] font-semibold hover:underline flex items-center space-x-1"
          >
            <span>View All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table View (Desktop & Tablet) */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-gray-400 uppercase text-[11px]">
                <th className="p-3 font-semibold">ORDER #</th>
                <th className="p-3 font-semibold">TYPE</th>
                <th className="p-3 font-semibold">CUSTOMER</th>
                <th className="p-3 font-semibold">ITEMS</th>
                <th className="p-3 font-semibold">STATUS</th>
                <th className="p-3 font-semibold">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {todayOrders.slice(0, 10).map((ord) => (
                <tr key={ord.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB]">
                  <td className="p-3 font-semibold text-[#111827]">{ord.order_number}</td>
                  <td className="p-3 capitalize font-medium text-[#4B5563]">
                    {ord.type} {ord.table_number ? `(T#${ord.table_number})` : ''}
                  </td>
                  <td className="p-3 text-[#111827]">{ord.customer_name || 'Walk-in Guest'}</td>
                  <td className="p-3 text-[#4B5563] max-w-xs truncate">
                    {ord.items.map(i => `${i.qty}x ${i.item_name}`).join(', ')}
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      ord.status === 'cooking' ? 'bg-orange-100 text-orange-700' :
                      ord.status === 'served' ? 'bg-green-100 text-green-700' :
                      ord.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-[#111827]">₹{ord.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card List View (Mobile) */}
        <div className="block sm:hidden divide-y divide-[#F3F4F6]">
          {todayOrders.slice(0, 10).map((ord) => (
            <div key={ord.id} className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#111827]">{ord.order_number}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  ord.status === 'cooking' ? 'bg-orange-100 text-orange-700' :
                  ord.status === 'served' ? 'bg-green-100 text-green-700' :
                  ord.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {ord.status}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {ord.customer_name || 'Walk-in Guest'} • {ord.type} {ord.table_number ? `(T#${ord.table_number})` : ''}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {ord.items.map(i => `${i.qty}x ${i.item_name}`).join(', ')}
              </div>
              <div className="text-sm font-bold text-[#111827] text-right">
                ₹{ord.total}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
