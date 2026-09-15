# 08. Raw Materials & Inventory Control

## File Location
- **Page Component**: [app/raw-materials/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/raw-materials/page.tsx)

---

## 📌 Purpose & Key Features

The **Raw Materials** module tracks kitchen raw ingredients (Biryani Rice, Fresh Chicken, Oil, Masala Spices, Butter) and triggers low-inventory alerts before key supplies run out.

---

## 🔔 Low Stock Alert System
- **Minimum Threshold Setting**: Each raw material has a configurable `min_threshold` (e.g. 25 kg minimum threshold for Fresh Chicken).
- **Automated Notifications**: When current stock drops below threshold, an alert notification is automatically dispatched to the notification center.
- **Stock Replenishment**: Direct action to add newly received vendor supplies to inventory counts.
