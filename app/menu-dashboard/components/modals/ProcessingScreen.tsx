"use client";

import React, { useState, useEffect } from 'react';
import { Bot, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProcessingScreenProps {
  isOpen: boolean;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ isOpen }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Scanning Uploaded Menu Photo...',
    'Extracting Categories & Dishes...',
    'Structuring Portion Rates (1 Person / 2 Persons)...',
    'Finalizing Menu Card for Review...'
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setTimeLeft(6);
      setStepIndex(0);
      return;
    }

    // Live progress timer (6 seconds estimated)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const next = prev + 15;
        if (next > 75) setStepIndex(3);
        else if (next > 50) setStepIndex(2);
        else if (next > 25) setStepIndex(1);
        return next;
      });

      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full space-y-6 animate-in fade-in duration-200">
        
        {/* Animated Loading Pulse Dot */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75" />
          <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg relative z-10">
            <Bot className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        {/* Titles */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#111827]">Processing Menu Photo</h2>
          <p className="text-xs text-[#6B7280]">AI Vision is extracting your dishes & rates</p>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
            <span>{steps[stepIndex]}</span>
            <span className="text-[#2563EB] font-bold">{progress}%</span>
          </div>

          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="bg-[#2563EB] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Live Countdown Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#2563EB]">
            <Clock className="w-4 h-4 animate-spin text-[#2563EB]" />
            <span>Ready in approx. {timeLeft} seconds</span>
          </div>

          <p className="text-[11px] text-gray-500">
            Your menu photo is being converted into editable menu cards automatically.
          </p>
        </div>

        {/* Dynamic step checklist */}
        <div className="space-y-1.5 text-left bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                idx <= stepIndex ? 'text-emerald-500' : 'text-gray-300'
              }`} />
              <span className={idx <= stepIndex ? 'font-semibold text-gray-800' : 'text-gray-400'}>
                {step}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
