"use client";

import React from 'react';
import { useAppState } from '@/lib/store';
import { QrCode, Download, Printer, UserCheck, UserX } from 'lucide-react';

export default function TableQRPage() {
  const { tables, toggleTableOccupancy } = useAppState();

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Table QR Code Management</h1>
          <p className="text-xs text-[#9CA3AF]">
            Generate QR codes for contact-free customer dining ordering & track table occupancy.
          </p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tables.map((tbl) => (
          <div
            key={tbl.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col items-center text-center space-y-4 hover:border-indigo-200 transition-all"
          >
            {/* Table Number & Badge */}
            <div className="w-full flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <span className="font-bold text-base text-[#111827]">Table #{tbl.table_number}</span>
              <button
                onClick={() => toggleTableOccupancy(tbl.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 cursor-pointer ${
                  tbl.is_occupied
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {tbl.is_occupied ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                <span>{tbl.is_occupied ? 'Occupied' : 'Vacant'}</span>
              </button>
            </div>

            {/* QR Image */}
            <div className="p-3 border border-[#E5E7EB] rounded-xl bg-white shadow-xs">
              <img
                src={tbl.qr_code_url}
                alt={`Table ${tbl.table_number} QR`}
                className="w-32 h-32 object-contain"
              />
            </div>

            <p className="text-xs text-[#9CA3AF]">Scan to open HFC Digital Menu & Order</p>

            {/* Actions */}
            <div className="w-full pt-2 border-t border-[#E5E7EB] flex items-center justify-center space-x-2">
              <a
                href={tbl.qr_code_url}
                target="_blank"
                rel="noreferrer"
                download={`HFC_Table_${tbl.table_number}_QR.png`}
                className="flex-1 py-2 bg-white border border-[#111827] text-[#111827] rounded-xl text-xs font-semibold hover:bg-[#F9FAFB] transition-colors flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save QR</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
