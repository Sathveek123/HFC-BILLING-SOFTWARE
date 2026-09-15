# HFC Billing Software — Comprehensive Documentation

Welcome to the official documentation for **HFC Billing Software**, a full-stack, enterprise-grade restaurant point-of-sale (POS) and operations management application built with **Next.js 14 App Router**, **Tailwind CSS**, **Lucide React**, and **Google Gemini / Groq Vision AI**.

---

## 📚 Table of Contents

| Section | Documentation File | Description |
|---|---|---|
| 01 | [System Architecture](file:///docs/01_SYSTEM_ARCHITECTURE.md) | Tech stack, state management, `localStorage` persistence, and AI API routes |
| 02 | [Dashboard & Overview](file:///docs/02_DASHBOARD.md) | Business KPIs, revenue overview, recent orders, quick actions |
| 03 | [Place Order (POS)](file:///docs/03_PLACE_ORDER_POS.md) | POS billing, portion selection (1 Person / 2 Persons), receipt printing |
| 04 | [Menu Dashboard](file:///docs/04_MENU_DASHBOARD.md) | Menu card tabs, Gemini 1.5/3.6 Flash AI vision extraction, portion editing |
| 05 | [Ongoing Orders](file:///docs/05_ONGOING_ORDERS.md) | Table-wise live order tracking, status flow (pending → cooking → served → completed) |
| 06 | [Order History Archive](file:///docs/06_ORDER_HISTORY.md) | Order search, historical audit, duplicate receipt printing |
| 07 | [Items & Stock](file:///docs/07_ITEMS_STOCK.md) | Item stock management, availability toggles |
| 08 | [Raw Materials Inventory](file:///docs/08_RAW_MATERIALS.md) | Kitchen raw ingredients inventory and minimum stock threshold alerts |
| 09 | [Cash Drawer Ledger](file:///docs/09_CASH_DRAWER.md) | Daily cash float opening, cash in/out entry tracking, net balance |
| 10 | [Expenses Tracker](file:///docs/10_EXPENSES.md) | Non-billing operational expense logging (Utilities, Gas cylinder, Supplies) |
| 11 | [Due Customers & Credit](file:///docs/11_DUE_CUSTOMERS.md) | Customer credit ledger, outstanding balance tracking, due settlement |
| 12 | [Employees Roster](file:///docs/12_EMPLOYEES.md) | Restaurant staff management, chef/waiter roles, salaries |
| 13 | [Table QR Codes](file:///docs/13_TABLE_QR.md) | Dining table QR code generation and management |
| 14 | [Sales Reports & Analytics](file:///docs/14_SALES_REPORTS.md) | Revenue breakdown, popular dishes analytics, sales trends |
| 15 | [Settings & Restaurant Profile](file:///docs/15_SETTINGS.md) | Restaurant details, tax configuration, bill receipt header setup |

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure Environment Keys (.env)
# GEMINI_API_KEY=your_gemini_api_key
# GROQ_API_KEY=your_groq_api_key

# 3. Start Development Server
npm run dev

# 4. Build for Production (Vercel Ready)
npm run build
```

---

## 🔒 Production Readiness & Zero-Crash Guarantee
- **SSR & LocalStorage Hydration**: Safe `useEffect` state loading prevents SSR hydration mismatches.
- **Portion Rate Handling**: Supports dual rates (`1 Person` / `2 Persons`) and single rate dishes.
- **Vercel Deployment Compatible**: Zero-dependency conflict build verified with Next.js 14 App Router static compilation.
