# 06. Order History & Audit Archive

## File Location
- **Page Component**: [app/order-history/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/order-history/page.tsx)

---

## 📌 Purpose & Key Features

The **Order History** module functions as the permanent sales register and transaction log. It records every completed bill with order numbers, timestamps, customer details, and payment breakdown.

---

## 🔍 Key Capabilities
- **Instant Search**: Search past orders by Order # (e.g. `HFC-2041`), customer name, or phone number.
- **Duplicate Thermal Receipt Printing**: Click **View Bill** on any historical order row to open `ReceiptModal` and reprint thermal bills.
- **Audit Trail**: View payment method (Cash, UPI, Card, Due) and tax/discount breakdown for audit verification.
