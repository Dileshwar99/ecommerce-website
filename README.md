# NEOUS | Future Footwear E-Commerce Platform

A futuristic, high-performance footwear e-commerce web application engineered with modern web technologies to deliver an avant-garde shopping experience.

---

## 📖 Project Overview

**NEOUS** is a cutting-edge footwear shopping platform showcasing premium running, lifestyle, high-top, and limited-edition sneakers. The application emphasizes high-contrast visual aesthetics (cyberpunk/modern minimalist dark mode with neon accents), ultra-responsive performance across all devices, robust client-side state management with local storage persistence, dynamic promo code calculations, interactive size guides, and an intuitive multi-step checkout workflow.

---

## ⚡ Key Features

- **Cyberpunk Dark Aesthetic & Fluid UI**: High-contrast modern interface with glassmorphism, responsive typography, and hover micro-interactions.
- **Dynamic Catalog & Advanced Filtering**:
  - Filter by category (*Running*, *Lifestyle*, *High-Top*, *Limited Drops*).
  - Real-time search by sneaker model name, style keywords, and category tags.
  - Multi-criteria sorting: *Price: Low to High*, *Price: High to Low*, *Name: A to Z*, and *Featured Drops*.
  - Interactive price range slider filter.
  - Dedicated Wishlist toggle and filter.
- **Rich Product Detail View**:
  - High-resolution multi-angle footwear photography.
  - Interactive UK shoe size selector with interactive Size Guide modal.
  - Real-time quantity adjustment controls.
  - Tabbed specification drawers (Overview, Materials & Specs, Shipping & Guarantees).
  - Dynamic related silhouette recommendations.
- **Shopping Cart & Persistent State**:
  - Complete state persistence synced with browser `localStorage`.
  - Floating toast notification engine for cart actions and wishlist updates.
  - Dynamic coupon validation system with instant discount calculations (`NEOUS10`, `FIRSTDROP`, `VIP20`).
  - Transparent subtotal, shipping fee, discount breakdown, and total calculations.
- **Multi-Step Checkout Flow**:
  - Form validation for shipping and contact details.
  - Delivery speed selector (*Standard Courier* vs *Express Flight Dispatch*).
  - Multiple payment options (*Credit/Debit Card*, *UPI / QR*, *Cash on Delivery*).
  - Automated Order Confirmation receipt modal with unique generated Order ID and tracking details.
- **100% Live Server & Static Hosting Ready**:
  - Uses `HashRouter` for seamless client-side navigation without requiring server-side fallback configurations.

---

## 🛠️ Technologies Used

- **Frontend Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 📱 Responsive Design Details

The application is thoroughly optimized for all screen form factors:

- **Mobile (320px – 480px)**: Fluid single-column layouts, animated mobile navigation drawer, touch-friendly tap targets, and sticky cart action bars.
- **Tablet (481px – 1024px)**: Adaptive 2-to-3 column grid displays, responsive filter modals, and flexible product details.
- **Laptop & Desktop (1024px+)**: 4-column product grids, persistent desktop navigation, sticky order summary sidebars, and desktop hover quick-add shortcuts.

---

## 📂 Project Structure

```text
ecommerce-website/
├── assets/                  # Pre-compiled static assets for Live Server
│   └── index.js             # Main bundled production script
├── components/              # Reusable UI components
│   ├── Footer.tsx           # Footer with newsletter and service guarantees
│   ├── Navbar.tsx           # Glassmorphic header with navigation and search
│   ├── ProductCard.tsx      # Sneaker card with quick-add and wishlist actions
│   └── Toast.tsx            # Floating interactive toast notification system
├── context/                 # Application state management
│   └── CartContext.tsx      # Shopping bag, wishlist, coupon, and toast state
├── pages/                   # Application views
│   ├── Cart.tsx             # Shopping bag overview and promo code management
│   ├── Checkout.tsx         # Multi-step shipping and payment checkout
│   ├── Home.tsx             # Hero drop, trending products, and category spotlight
│   ├── ProductDetails.tsx   # Detailed sneaker view, sizing guide, and specs
│   └── Shop.tsx             # Complete catalog with real-time search & filters
├── App.tsx                  # Root application component and routing setup
├── data.ts                  # Footwear product catalog dataset
├── index.html               # Main HTML entry point
├── index.tsx                # React DOM root mounting
├── package.json             # Project dependencies and build scripts
├── tsconfig.json            # TypeScript compiler configuration
├── types.ts                 # TypeScript data contracts and interfaces
└── vite.config.ts           # Vite build configuration
```

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Instant Launch)
1. Open the project root folder in **VS Code**.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"** (or click **"Go Live"** in the status bar).
4. The application will launch in your default web browser at `http://127.0.0.1:5500`.

### Option 2: Vite Development Server
1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Production Build
```bash
npm run build
```
Compiles the application and updates the static assets in `/assets` for instant static hosting.

---

## 🎟️ Active Promo Codes

Use these codes at checkout to test the discount calculations:
- `NEOUS10` : 10% Discount
- `FIRSTDROP` : 15% Discount
- `VIP20` : 20% Discount

---

## 👤 Author Information

- **Author**: Dileshwar Kumar
- **LinkedIn**: [https://www.linkedin.com/in/dileshwarkumar/](https://www.linkedin.com/in/dileshwarkumar/)
