"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, X } from 'lucide-react';

export default function CashDrawerPage() {
  const { cashDrawer, addCashEntry } = useAppState();
  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState<'in' | 'out'>('in');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const totalIn = cashDrawer.filter((c) => c.type === 'in').reduce((sum, c) => sum + c.amount, 0);
  const totalOut = cashDrawer.filter((c) => c.type === 'out').reduce((sum, c) => sum + c.amount, 0);
  const netBalance = totalIn - totalOut;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    addCashEntry({
      type,
      amount: Number(amount),
      note: note || (type === 'in' ? 'Manual Cash In' : 'Manual Cash Out'),
    });

    setAmount('');
    setNote('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Daily Cash Drawer Ledger</h1>
          <p className="text-xs text-[#9CA3AF]">
            Track opening float, cash bill payments, payout entries, and closing balance.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Cash Entry</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-[#9CA3AF] uppercase">Net Cash Balance</span>
          <div className="text-2xl font-bold text-[#4338CA] mt-1">₹{netBalance.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-emerald-600 uppercase">Total Cash In</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">₹{totalIn.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-red-600 uppercase">Total Cash Out</span>
          <div className="text-2xl font-bold text-[#111827] mt-1">₹{totalOut.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold">Note / Description</th>
              <th className="p-3 font-semibold text-right">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {cashDrawer.map((entry) => (
              <tr key={entry.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center w-fit space-x-1 ${
                    entry.type === 'in'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {entry.type === 'in' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    <span className="uppercase">{entry.type}</span>
                  </span>
                </td>
                <td className="p-3 font-bold text-sm text-[#111827]">
                  {entry.type === 'in' ? '+' : '-'}₹{entry.amount}
                </td>
                <td className="p-3 text-[#4B5563]">{entry.note}</td>
                <td className="p-3 text-right text-[#9CA3AF]" suppressHydrationWarning>
                  {new Date(entry.date).toLocaleString()}
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
              <h3 className="font-bold text-base text-[#111827]">Log Cash Drawer Entry</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Entry Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('in')}
                    className={`py-2 text-xs font-semibold rounded-lg border ${
                      type === 'in'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563]'
                    }`}
                  >
                    Cash In (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('out')}
                    className={`py-2 text-xs font-semibold rounded-lg border ${
                      type === 'out'
                        ? 'bg-red-50 text-red-700 border-red-300'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563]'
                    }`}
                  >
                    Cash Out (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Note / Reason</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Milk & curd purchase"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
