# 09. Daily Cash Drawer Ledger

## File Location
- **Page Component**: [app/cash-drawer/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/cash-drawer/page.tsx)

---

## 📌 Purpose & Key Features

The **Daily Cash Drawer** tracks morning float opening amounts, cash bill payments collected at POS, vendor payouts, and closing cash register balances.

---

## 💵 Key Features
- **Automatic Cash Bill Inflow**: Placing a POS bill with payment mode `Cash` automatically logs a `Cash In (+)` entry with the order number and amount.
- **Manual Cash In / Cash Out**: Register opening float, owner cash additions, or petty cash withdrawals.
- **Net Balance Calculation**: Displays real-time `Total Cash In`, `Total Cash Out`, and `Net Cash Balance`.
