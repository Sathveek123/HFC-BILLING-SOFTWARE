# 05. Ongoing Orders & Live Table Tracker

## File Location
- **Page Component**: [app/ongoing-orders/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/ongoing-orders/page.tsx)

---

## 📌 Purpose & Key Features

The **Ongoing Orders** page provides kitchen staff, floor waiters, and cashiers with live order tracking for all active dine-in tables, takeaway packages, and delivery orders.

---

## 🔄 Order Lifecycle States

1. `pending`: Order just placed at POS, awaiting kitchen preparation.
2. `cooking`: Chef preparing order in kitchen (KOT active).
3. `served`: Food served to dining table.
4. `completed`: Customer payment completed, order closed.
5. `cancelled`: Voided or cancelled order.

---

## 💡 Key Features
- **Table Occupancy Sync**: Completing a dine-in order automatically frees up the assigned table (`is_occupied: false`).
- **Live Status Badges**: Visual color indicators (Amber for cooking, Blue for pending, Emerald for completed).
- **Quick Action Buttons**: Mark order as cooked, served, or settled in a single click.
