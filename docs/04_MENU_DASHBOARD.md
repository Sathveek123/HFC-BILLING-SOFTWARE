# 04. Menu Dashboard & AI Photo Extractor

## File Location
- **Page Component**: [app/menu-dashboard/page.tsx](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/menu-dashboard/page.tsx)
- **API Endpoint**: [app/api/extract-menu/route.ts](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/app/api/extract-menu/route.ts)
- **AI Helper**: [lib/extractMenu.ts](file:///d:/Client%20Projects/MY%20PROJECTS/HFC%20Billing%20Software/lib/extractMenu.ts)
- **Modals**:
  - `BulkUploadMethodModal.tsx`
  - `ReviewPhotosScreen.tsx`
  - `ProcessingScreen.tsx`
  - `BulkUploadReviewModal.tsx`
  - `ConfirmReplaceMenuModal.tsx`
  - `AddMenuCardModal.tsx`

---

## 📌 Purpose & Key Features

The **Menu Dashboard** empowers restaurant owners to build, edit, organize, and digitize their entire menu card manually or via **Google Gemini / Groq AI Vision**.

---

## 📸 AI Menu Photo Scanner Workflow

1. **Upload / Capture**: Owner uploads a menu card photo or snap.
2. **Review & Crop**: Confirm image visibility.
3. **AI Vision Processing**: Progress screen displays live progress bar (0–100%) and 6s countdown while calling `/api/extract-menu`.
4. **Structured Review Modal**:
   - Extracted items are categorized automatically.
   - Owner can edit item names, `1 Person (₹)` rate, and `2 Persons (₹)` rate.
   - Portion toggle switch turns dual portion rates on or off per item.
5. **Save Options**:
   - **Append to Menu**: Keeps existing items and adds newly extracted items.
   - **Clear Past Menu & Save**: Prompts confirmation modal, clears past dishes, and saves the new menu card.
