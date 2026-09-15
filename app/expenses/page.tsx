"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Receipt, Plus, X } from 'lucide-react';

export default function ExpensesPage() {
  const { expenses, addExpense } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Raw Materials');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      amount: Number(amount),
      category,
    });

    setTitle('');
    setAmount('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Business Expenses Tracker</h1>
          <p className="text-xs text-[#9CA3AF]">
            Record non-billing expenses (Utilities, Gas, Vendor Payments, Maintenance).
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* KPI Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs max-w-sm">
        <span className="text-xs font-medium text-[#9CA3AF] uppercase">Total Logged Expenses</span>
        <div className="text-2xl font-bold text-[#111827] mt-1">₹{totalExpenses.toLocaleString('en-IN')}</div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Expense Title</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                <td className="p-3 font-semibold text-[#111827]">{exp.title}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-[11px] font-medium border border-gray-200">
                    {exp.category}
                  </span>
                </td>
                <td className="p-3 font-bold text-sm text-[#111827]">₹{exp.amount}</td>
                <td className="p-3 text-right text-[#9CA3AF]" suppressHydrationWarning>
                  {new Date(exp.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-base text-[#111827]">Log New Expense</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Commercial Gas Refill"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1850"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                >
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Utilities">Utilities (Gas/Electricity)</option>
                  <option value="Supplies">Supplies & Packaging</option>
                  <option value="Maintenance">Maintenance & Cleaning</option>
                  <option value="Staff Expenses">Staff Expenses</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
