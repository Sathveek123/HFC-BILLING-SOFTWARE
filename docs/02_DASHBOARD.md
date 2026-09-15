# 02. Dashboard & Overview

## File Location
- **Page Component**: [app/dashboard/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/dashboard/page.tsx)

---

## 📌 Purpose & Key Features

The **Dashboard** serves as the central command hub for the restaurant owner and manager, offering real-time visibility into daily revenue, order counts, active dining tables, and quick action shortcuts.

---

## 📊 Included Metrics & Analytics

1. **Today's Total Revenue**:
   - Calculates total earnings from completed cash, UPI, and card transactions today.
2. **Total Orders Count**:
   - Displays count of Dine-in, Takeaway, and Delivery orders placed today.
3. **Active Occupied Tables**:
   - Live count of tables currently marked occupied in the restaurant (`tbl.is_occupied === true`).
4. **Pending / Kitchen Orders**:
   - Displays orders currently in `pending` or `cooking` status awaiting completion.

---

## 🚀 Quick Actions & Navigation
- **+ Place New Order**: Direct jump to POS Billing screen.
- **Upload Menu Card**: Direct jump to AI Menu photo scanner.
- **View Cash Ledger**: Direct jump to Daily Cash Drawer.
- **Recent Orders List**: Quick overview table of the latest 5 orders with status badges.
