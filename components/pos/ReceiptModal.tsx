"use client";

import React from 'react';
import { Order } from '@/types';
import { Printer, X, CheckCircle2 } from 'lucide-react';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-sm w-full p-6 shadow-xl relative font-mono text-xs">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-gray-100 text-gray-500 font-sans"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Area */}
        <div id="printable-receipt" className="space-y-4 text-[#111827]">
          {/* Header */}
          <div className="text-center space-y-1 pb-3 border-b border-dashed border-gray-300">
            <h2 className="text-base font-bold tracking-tight font-sans">HFC RESTAURANT - TINDI KLUBB</h2>
            <p className="text-[11px] font-sans text-gray-600">Main Road, Food Street, City</p>
            <p className="text-[11px] font-sans text-gray-600">GSTIN: 36AAAAA0000A1Z5 | Ph: +91 98765 43210</p>
          </div>

          {/* Order Details */}
          <div className="flex justify-between text-[11px] py-1 border-b border-dashed border-gray-300">
            <div>
              <p><strong>Order #:</strong> {order.order_number}</p>
              <p><strong>Type:</strong> {order.type.toUpperCase()} {order.table_number ? `(Table #${order.table_number})` : ''}</p>
            </div>
            <div className="text-right" suppressHydrationWarning>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          {/* Customer info */}
          <div className="text-[11px] pb-1 border-b border-dashed border-gray-300">
            <p><strong>Customer:</strong> {order.customer_name || 'Walk-in Guest'}</p>
            {order.customer_phone && <p><strong>Phone:</strong> {order.customer_phone}</p>}
          </div>

          {/* Items Table */}
          <div className="space-y-2 py-1 border-b border-dashed border-gray-300">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="w-1/2">ITEM</span>
              <span className="w-1/6 text-center">QTY</span>
              <span className="w-1/3 text-right">PRICE (₹)</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px]">
                <span className="w-1/2 truncate">
                  {item.item_name} {item.variant === 'half' ? '(Half)' : ''}
                </span>
                <span className="w-1/6 text-center">{item.qty}</span>
                <span className="w-1/3 text-right">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 text-[11px] pt-1 font-mono">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{(order.total - order.tax + order.discount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm pt-2 border-t border-gray-400 font-sans text-brand-700">
              <span>GRAND TOTAL</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1">
              <span>Payment Mode:</span>
              <span className="uppercase font-semibold">{order.payment_method}</span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-gray-500 pt-3 border-t border-dashed border-gray-300 font-sans">
            <p className="font-semibold text-gray-700">Thank you for dining with HFC!</p>
            <p>Visit Again • Have a Great Day</p>
          </div>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-6 flex items-center space-x-3 font-sans">
          <button
            onClick={handlePrint}
            className="flex-1 h-10 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 h-10 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
