"use client";

import React, { useState } from 'react';
import { Megaphone, Tag, Plus, CheckCircle, Copy } from 'lucide-react';

export default function MarketingPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promoCodes = [
    { code: 'HFCFIRST10', discount: '10% OFF', minOrder: 300, validUntil: '2026-12-31', status: 'Active' },
    { code: 'BIRYANI50', discount: 'Flat ₹50 OFF', minOrder: 500, validUntil: '2026-10-31', status: 'Active' },
    { code: 'WEEKEND15', discount: '15% OFF', minOrder: 700, validUntil: '2026-11-15', status: 'Active' },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Marketing & Discount Offers</h1>
          <p className="text-xs text-[#9CA3AF]">
            Create promotional coupon codes & boost customer retention during offline & online campaigns.
          </p>
        </div>

        <button className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs">
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Promo Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {promoCodes.map((promo, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4 hover:border-indigo-200 transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4338CA] bg-[#EEF2FF] px-2.5 py-1 rounded-md tracking-wider">
                {promo.code}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {promo.status}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#111827]">{promo.discount}</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">Min Order Value: ₹{promo.minOrder}</p>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Valid till: {promo.validUntil}</span>
              <button
                onClick={() => handleCopy(promo.code)}
                className="text-[#4338CA] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {copiedCode === promo.code ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === promo.code ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
