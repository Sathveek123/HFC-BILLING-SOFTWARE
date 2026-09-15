"use client";

import React, { useState } from 'react';
import { Settings, Save, Printer, Building, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [restaurantName, setRestaurantName] = useState('HFC Restaurant');
  const [address, setAddress] = useState('Main Road, Food Street, City');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [gstin, setGstin] = useState('36AAAAA0000A1Z5');
  const [taxRate, setTaxRate] = useState('5');
  const [paperWidth, setPaperWidth] = useState('80mm');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 bg-white max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Restaurant Profile & Settings</h1>
          <p className="text-xs text-[#9CA3AF]">
            Configure tax GST rate, receipt header layout, thermal printer width, and outlet details.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Restaurant Outlet Details */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <Building className="w-5 h-5 text-[#4338CA]" />
            <h2 className="font-bold text-base text-[#111827]">Outlet Identity & Receipt Branding</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1">Restaurant Name</label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
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
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#4B5563] mb-1">Address (Printed on thermal bill)</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* GST & Tax Setup */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <Settings className="w-5 h-5 text-[#4338CA]" />
            <h2 className="font-bold text-base text-[#111827]">GSTIN & Tax Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1">GSTIN Registration Number</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1">Standard Restaurant GST (%)</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
              >
                <option value="5">5% (Standard AC/Non-AC Restaurant Rate)</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="0">0% (Tax Exempt)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Thermal Printer Settings */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E5E7EB] pb-3">
            <Printer className="w-5 h-5 text-[#4338CA]" />
            <h2 className="font-bold text-base text-[#111827]">POS Thermal Printer Setup</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1">Thermal Receipt Roll Width</label>
              <select
                value={paperWidth}
                onChange={(e) => setPaperWidth(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
              >
                <option value="80mm">80mm (Standard Desktop Receipt Roll)</option>
                <option value="58mm">58mm (Handheld Mobile Bluetooth Printer)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 h-11 bg-[#4338CA] text-white rounded-xl text-sm font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
