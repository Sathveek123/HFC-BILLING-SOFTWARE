# 03. Place Order (POS Billing System)

## File Location
- **Page Component**: [app/place-order/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/place-order/page.tsx)
- **Portion Modal**: [components/pos/PortionModal.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/components/pos/PortionModal.tsx)
- **Printable Receipt**: [components/pos/ReceiptModal.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/components/pos/ReceiptModal.tsx)

---

## 📌 Purpose & Key Features

The **Place Order (POS)** interface is designed for high-speed counter billing and waiter order entry. It supports dual portion pricing, active menu card switching, live tax/discount calculation, and thermal receipt printing.

---

## 🎨 Dual-Tier Free-Flow Filter System
- **Menu Card Switcher**: Smooth pill tabs allowing cashiers to switch active menu cards (`Main Menu`, `Combos Menu`, `Beverages Menu`).
- **Category Filter Pills Bar**: Horizontal scrolling category pills with dynamic item count badges (`All Items [99]`, `FRIED RICE [18]`).
- **Instant Search**: Real-time filtering by item name or keyword.

---

## 🍲 Portion Selection Logic
1. **Single Portion Items** (e.g. *Joint Biryani ₹249*):
   - Clicking item directly adds `1 Person` portion to the active bill cart.
2. **Dual Portion Items** (e.g. *Chicken Fried Rice 1 Person: ₹130 / 2 Persons: ₹240*):
   - Direct button `+ 1 Person (₹130)` adds half portion instantly.
   - Clicking `+ Add` opens `PortionModal` with clear radio options for `1 Person` vs `2 Persons`.

---

## 🧾 Billing & Thermal Receipt Printing
- **Order Types**: Dine-in (with table assignment), Takeaway, Delivery.
- **Payment Modes**: Cash Pay, UPI / QR, Card, Due Credit.
- **Receipt Printing**: Clicking *Print Receipt* triggers 80mm thermal receipt layout with restaurant header, GST breakdown, itemized line items, and final total.
