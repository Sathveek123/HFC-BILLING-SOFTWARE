"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Utensils, Store } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate login redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* Container Card */}
      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm space-y-8 text-center">
        
        {/* Brand Header */}
        <div className="space-y-3">
          <div className="w-14 h-14 bg-[#EEF2FF] border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
            <Utensils className="w-7 h-7 text-[#4338CA]" />
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">HFC Billing Software</h1>
          <p className="text-sm text-[#9CA3AF]">
            Sign in to manage POS billing, inventory, cash drawer, and kitchen orders.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Custom Styled Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 bg-white border border-[#111827] rounded-xl flex items-center justify-center space-x-3 text-sm font-medium text-[#111827] hover:bg-[#F9FAFB] active:scale-[0.99] transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            {/* Google G Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
          </button>

          {/* Quick Demo Access */}
          <button
            onClick={handleGoogleLogin}
            className="w-full h-11 bg-[#4338CA] text-white rounded-xl text-sm font-medium hover:bg-indigo-800 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Enter HFC Billing System</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Security Footer Note */}
        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-center space-x-2 text-xs text-[#9CA3AF]">
          <ShieldCheck className="w-4 h-4 text-[#4338CA]" />
          <span>Secured by Supabase RLS Row-Level Security</span>
        </div>
      </div>
    </div>
  );
}
