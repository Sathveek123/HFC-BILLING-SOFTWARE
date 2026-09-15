"use client";

import React, { useState } from 'react';
import { useAppState } from '@/lib/store';
import { Users2, Plus, Phone, Calendar, X } from 'lucide-react';

export default function EmployeesPage() {
  const { employees, addEmployee } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Head Chef');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !salary) return;

    addEmployee({
      name,
      role,
      phone,
      salary: Number(salary),
      joined_at: new Date().toISOString().split('T')[0],
    });

    setName('');
    setPhone('');
    setSalary('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Restaurant Staff & Employees</h1>
          <p className="text-xs text-[#9CA3AF]">
            Manage kitchen chefs, cashiers, stewards, salaries, and contact details.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#4338CA] text-white rounded-xl text-xs font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3 hover:border-indigo-200 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4338CA] font-bold text-sm flex items-center justify-center border border-indigo-100">
                {emp.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#111827]">{emp.name}</h3>
                <span className="text-xs font-medium text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                  {emp.role}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] space-y-1.5 text-xs text-[#4B5563]">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1 text-[#9CA3AF]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone:</span>
                </span>
                <span className="font-semibold text-[#111827]">{emp.phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#9CA3AF]">Monthly Salary:</span>
                <span className="font-bold text-[#111827]">₹{emp.salary.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1 text-[#9CA3AF]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined Date:</span>
                </span>
                <span className="text-[#4B5563]">{emp.joined_at}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Employee */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-base text-[#111827]">Add Employee</h3>
              <button onClick={() => setShowModal(false)} className="text-[#9CA3AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Suresh Varma"
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Role / Position</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg text-sm focus:border-[#4338CA] focus:outline-none"
                >
                  <option value="Head Biryani Chef">Head Biryani Chef</option>
                  <option value="Assistant Chef">Assistant Chef</option>
                  <option value="Billing Manager / Cashier">Billing Manager / Cashier</option>
                  <option value="Senior Steward">Senior Steward</option>
                  <option value="Kitchen Helper">Kitchen Helper</option>
                </select>
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
                <label className="block text-xs font-semibold text-[#4B5563] mb-1">Monthly Salary (₹)</label>
                <input
                  type="number"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="20000"
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
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
