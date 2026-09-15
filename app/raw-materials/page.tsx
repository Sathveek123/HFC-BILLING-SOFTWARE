"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Archive, Plus, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function RawMaterialsPage() {
  const { rawMaterials, addRawMaterial, updateRawMaterialQty } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('kg');
  const [quantity, setQuantity] = useState('');
  const [minThreshold, setMinThreshold] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity) return;

    addRawMaterial({
      name,
      unit,
      quantity: Number(quantity),
      min_threshold: Number(minThreshold) || 5,
    });

    setName('');
    setQuantity('');
    setMinThreshold('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Raw Material Inventory</h1>
          <p className="text-xs text-[#9CA3AF]">
            Track kitchen raw ingredients (Rice, Oil, Meat, Spices, Dairy) & receive replenishment alerts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Raw Material</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] uppercase text-[11px]">
              <th className="p-3 font-semibold">Material Name</th>
              <th className="p-3 font-semibold">Current Quantity</th>
              <th className="p-3 font-semibold">Min Threshold</th>
              <th className="p-3 font-semibold">Stock Status</th>
              <th className="p-3 font-semibold text-right">Update Qty</th>
            </tr>
          </thead>
          <tbody>
            {rawMaterials.map((rm) => {
              const isLow = rm.quantity <= rm.min_threshold;
              return (
                <tr key={rm.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                  <td className="p-3 font-semibold text-[#111827]">{rm.name}</td>
                  <td className="p-3 font-bold text-sm text-[#111827]">{rm.quantity} {rm.unit}</td>
                  <td className="p-3 text-[#4B5563]">{rm.min_threshold} {rm.unit}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center w-fit space-x-1 ${
                      isLow
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {isLow ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      <span>{isLow ? 'Refill Required' : 'Adequate'}</span>
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={rm.quantity}
                      onChange={(e) => updateRawMaterialQty(rm.id, Number(e.target.value))}
                      className="w-20 px-2 py-1 bg-white border border-[#D1D5DB] rounded-md text-xs text-right font-semibold focus:border-[#4338CA] focus:outline-none"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-base text-[#111827]">Add Raw Material</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Material Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Basmati Biryani Rice"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="liters">liters</option>
                    <option value="packets">packets</option>
                    <option value="boxes">boxes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="50"
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={minThreshold}
                    onChange={(e) => setMinThreshold(e.target.value)}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                  />
                </div>
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
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
