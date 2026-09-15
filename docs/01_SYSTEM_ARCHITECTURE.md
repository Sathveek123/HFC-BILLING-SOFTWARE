# 01. System Architecture & Tech Stack

## Overview
**HFC Billing Software** is built as a single-page reactive web application using **Next.js 14 App Router** with Client-Side React Context for global state and persistent local storage synchronization.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Server-Side Rendering (SSR), Client Routing, API Route Handlers |
| **Styling** | Vanilla CSS + Tailwind CSS | Custom design system (`#FFFFFF` background, `#2563EB`/`#4338CA` indigo accents) |
| **Icons** | Lucide React | Clean, modern vector icons |
| **State Management** | React Context API (`lib/store.tsx`) | Centralized state management for orders, menus, stock, cash drawer, and customers |
| **Persistence** | Browser `localStorage` | Preserves menu cards, categories, items, and orders across browser refreshes |
| **AI Extraction** | Google Gemini 1.5/3.6 Flash & Groq | Vision AI text & price extraction from physical menu card photos |

---

## 💾 LocalStorage Persistence System

The application state store ([lib/store.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/lib/store.tsx)) maintains a two-phase synchronization lifecycle:

1. **Mount Hydration (`useEffect`)**:
   - On initial client render, `localStorage.getItem()` reads saved state for `hfc_menus`, `hfc_categories`, `hfc_menu_items`, `hfc_orders`, etc.
   - Restores custom uploaded menu cards, portion prices, and categories into React state.
   - Prevents Next.js SSR hydration mismatches via an explicit `isHydrated` state flag.

2. **State Serialization (`useEffect`)**:
   - Whenever menus, categories, items, or orders are added, updated, or deleted, `localStorage.setItem()` writes the updated JSON string back to local storage.
   - Ensures menu items are **never lost on page refresh** unless explicitly deleted by the user.

---

## 🤖 AI Vision Extraction Pipeline ([app/api/extract-menu/route.ts](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/api/extract-menu/route.ts))

1. Owner uploads or snaps a photo of a physical menu card.
2. The image is converted to Base64 via `lib/extractMenu.ts`.
3. Sent to POST `/api/extract-menu`.
4. Endpoint calls Gemini / Groq Vision API with structured JSON schema:
   - Category Name
   - Dish Item Name
   - `price` (Full portion / 2 Persons price)
   - `half_price` (1 Person price if available)
5. Sanitized JSON parser (`parseJsonSafely`) strips Markdown wrappers and fixes trailing commas.
6. Returns structured categories & dishes to the `BulkUploadReviewModal`.
