# Sticker.pedia // Precision Printed. Built to Stick.

A high-performance, modern minimalist web application for the custom sticker and print brand **"Sticker.pedia"**, with clean privacy separation between the public-facing client storefront and the protected staff administration dashboard.

---

## 🔒 Security & Privacy Architecture

1. **Client-Only Storefront (`/`)**:
   - The public landing page is reserved exclusively for clients.
   - All dual split-view options and public admin toggles have been removed.
   - Staff access is restricted behind a discrete portal login.
2. **Protected Admin Portal (`/admin`)**:
   - Gated behind authentication requiring staff email and passkey.
   - **Default Staff Credentials**:
     - **Email**: `admin@sticker.pedia`
     - **Passkey**: `stickerpedia2026`
   - Unauthenticated visitors are blocked by the security gate.
   - Includes full session management and **Sign Out** functionality.
3. **Comprehensive Customer Delivery Coordinates for Orders & Printing**:
   - Clients enter or save their delivery coordinates for printing:
     - **Full Name**
     - **Email**
     - **Phone Number**
     - **Place / Street Address**
     - **District / City**
     - **PIN / Postal Code**
     - **State / Province**
     - **Country**
   - Automatically populates on both the **Live Showcase Grid** (*"Quick Drop"*) and the **Interactive Die-Cut Studio** (*"Custom Die-Cut"*).
   - Displayed directly on the Admin Print Queue Kanban board for production rip setup and logistics dispatch.

---

## 🎨 Brand Aesthetic & Design System

- **Color Palette**:
  - Jet Black (`#000000` / `#0C0D0E`) & Deep Charcoal Surface (`#09090B` / `#141619`)
  - Electric Acid Lime / Hyper Lemon (`#CCFF00`)
  - Electric Cobalt Blue (`#101EC4`)
  - Off-White (`#F4F5F6`), Pure White (`#FFFFFF`) & Muted Gray (`#8E929B`)
  - Subtle Slate Border (`#26282E` / `rgba(255, 255, 255, 0.12)`)
- **Typography**: Inter paired with JetBrains Mono for inventory codes, badge IDs, and live metrics.

---

## 🚀 Running Locally

```bash
# Start development server
npm.cmd run dev
```

- **Client Storefront**: `http://localhost:3000`
- **Protected Admin Portal**: `http://localhost:3000/admin`
"# StickerPediaStore" 
