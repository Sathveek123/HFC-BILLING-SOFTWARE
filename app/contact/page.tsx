"use client";

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-5">
        <h1 className="text-xl font-bold text-[#111827]">Contact HFC Billing Support</h1>
        <p className="text-xs text-[#9CA3AF]">
          Direct help desk hotline & technical support for HFC Billing software users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Hotline Cards */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-3 text-[#4338CA]">
              <Phone className="w-5 h-5" />
              <h3 className="font-bold text-sm text-[#111827]">24/7 Priority Support Helpline</h3>
            </div>
            <p className="text-xs text-[#4B5563]">Call us anytime for urgent thermal printer or POS software assistance.</p>
            <div className="text-base font-bold text-[#4338CA]">+91 1800 432 9900</div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-3 text-emerald-600">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold text-sm text-[#111827]">WhatsApp POS Helpdesk</h3>
            </div>
            <p className="text-xs text-[#4B5563]">Chat with an HFC specialist directly on WhatsApp.</p>
            <div className="text-base font-bold text-emerald-700">+91 98765 00112</div>
          </div>
        </div>

        {/* Raise Support Ticket Form */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-base text-[#111827]">Raise Support Ticket</h2>
          
          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-emerald-900">Support Ticket Submitted!</h3>
              <p className="text-xs text-emerald-700">An HFC technical engineer will call your registered owner phone number within 15 minutes.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-800 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Subject / Issue Topic</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Thermal Printer bluetooth connection issue"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Details & Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what happened..."
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
