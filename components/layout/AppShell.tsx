"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { usePathname } from 'next/navigation';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // If on login page, skip app shell wrapper
  if (pathname === '/login') {
    return <main className="min-h-screen bg-white font-sans">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#111827]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 bg-white min-h-screen">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
