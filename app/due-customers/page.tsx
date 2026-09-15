"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Users, Plus, CheckCircle, X } from 'lucide-react';

export default function DueCustomersPage() {
  const { customers, addCustomer, settleCustomerDue } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [settleModal, setSettleModal] = useState<{ id: string; name: string; due: number } | null>(null);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [initialDue, setInitialDue] = useState('');

  const [settleAmount, setSettleAmount] = useState('');

  const totalDueAmount = customers.reduce((sum, c) => sum + c.total_due, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addCustomer({
      name,
      phone,
      total_due: Number(initialDue) || 0,
    });

    setName('');
    setPhone('');
    setInitialDue('');
    setShowModal(false);
  };

  const handleSettle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settleModal || !settleAmount) return;

    settleCustomerDue(settleModal.id, Number(settleAmount));
    setSettleAmount('');
    setSettleModal(null);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Customer Credit & Due Ledger</h1>
          <p className="text-xs text-[#9CA3AF]">
            Manage regular customer credit balances (Khata) and record debt clear payments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* KPI Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs max-w-sm">
        <span className="text-xs font-medium text-red-600 uppercase">Total Outstanding Customer Dues</span>
        <div className="text-2xl font-bold text-[#111827] mt-1">₹{totalDueAmount.toLocaleString('en-IN')}</div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Customer Name</th>
              <th className="p-3 font-semibold">Phone Number</th>
              <th className="p-3 font-semibold">Total Due Amount</th>
              <th className="p-3 font-semibold text-right">Settlement</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                <td className="p-3 font-semibold text-[#111827]">{cust.name}</td>
                <td className="p-3 text-[#4B5563]">{cust.phone}</td>
                <td className="p-3 font-bold text-sm text-[#111827]">
                  <span className={cust.total_due > 0 ? 'text-red-600' : 'text-emerald-600'}>
                    ₹{cust.total_due}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {cust.total_due > 0 ? (
                    <button
                      onClick={() => setSettleModal({ id: cust.id, name: cust.name, due: cust.total_due })}
                      className="px-3 py-1.5 bg-[#EEF2FF] text-[#4338CA] rounded-lg text-xs font-semibold hover:bg-indigo-100"
                    >
                      Clear Due
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-semibold text-xs flex items-center justify-end space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Cleared</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add Customer */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-base text-[#111827]">Add Customer</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Initial Due (₹) (Optional)</label>
                <input
                  type="number"
                  value={initialDue}
                  onChange={(e) => setInitialDue(e.target.value)}
                  placeholder="0"
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
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Settle Due */}
      {settleModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-base text-[#111827]">Settle Due for {settleModal.name}</h3>
              <button onClick={() => setSettleModal(null)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSettle} className="space-y-4">
              <p className="text-xs text-[#4B5563]">Current Total Due: <strong>₹{settleModal.due}</strong></p>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Payment Received (₹)</label>
                <input
                  type="number"
                  required
                  max={settleModal.due}
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(e.target.value)}
                  placeholder={String(settleModal.due)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSettleModal(null)}
                  className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
