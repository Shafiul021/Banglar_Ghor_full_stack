# Banlgar Ghor Remodeling — NYC Residential Architecture & Design-Build

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![LibSQL](https://img.shields.io/badge/Database-LibSQL%20%2F%20SQLite-008080)](https://turso.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

A full-stack, production-ready web platform and authenticated Content Management System (CMS) built for **Banlgar Ghor Remodeling**, a premier luxury residential remodeling and architectural design-build firm serving Manhattan, Brooklyn, Queens, and Westchester County.

---

## ✨ Features & Architecture

### 🏛️ Luxury Editorial Public Experience
- **Cinematic Header Backgrounds:** Bespoke architectural imagery and dark gradients across all pages.
- **Interactive Before / After Comparison Slider:** Smooth touch-and-drag slider showcasing historic brownstone and luxury kitchen transformations.
- **Filterable Project Portfolio:** High-resolution galleries sorted by project category (Kitchens, Bathrooms, Brownstones, Basements, Additions).
- **Service Detail Deep Dives:** Comprehensive scope, material guides, municipal approval steps, and FAQs per service.
- **Multi-Step Intake Consultation Funnel:** Interactive questionnaire with project scope, budget ranges, timeline options, and honeypot spam protection.
- **Instant Searchable Knowledge Base:** Categorized FAQ explorer for NYC alteration boards, DOB permits, and budget planning.
- **SEO & Social Optimization:** Dynamic OpenGraph tags, sitemap generation (`/sitemap.xml`), and robots.txt (`/robots.txt`).

### ⚙️ Authenticated Admin CMS (`/admin`)
- **Executive Analytics Dashboard:** Real-time metrics on incoming consultation leads, message inquiries, and active projects.
- **Project CRUD & Before/After Pairings:** Add and update residential projects, assign before/after slider images, budget specifications, and materials.
- **Consultation Leads Pipeline:** Manage inbound leads through structured stages (*New*, *Contacted*, *Qualified*, *Proposal Sent*).
- **Media Asset Library:** High-resolution image upload, previewing, and instant URL copying.
- **Company Settings Management:** Update contact numbers, DOB licenses, insurance details, and homepage hero copy on the fly.
- **Role-Based Access Control (RBAC):** Manage admin team permissions (*Super Admin*, *Editor*, *Project Manager*, *Sales*).
- **Full Compliance Audit Logs:** Complete chronological audit trail for all admin operations.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Server & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom architectural luxury palette: `#FAF8F5`, `#1C1B1A`, `#C9A979`, `#9E7D4C`)
- **Typography:** Playfair Display (Serif headings) & Plus Jakarta Sans (UI body)
- **Database:** Local embedded **LibSQL / SQLite** via `@libsql/client` (Zero external setup required; cloud-ready with Turso)
- **Authentication:** Edge-compatible JWT signing and verification via `jose` with `bcryptjs` password hashing
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Shafiul021/Banglar_Ghor_full_stack.git
cd Banglar_Ghor_full_stack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Admin CMS Access

Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** and log in with the pre-seeded Super Admin account:

- **Email:** `admin@banlgarghor.com`
- **Password:** `admin123456`

*(You can update credentials or add new administrative users at `/admin/users`).*

---

## 🧪 Testing & Verification

Run the comprehensive end-to-end integration and verification suites:
```bash
# Verify public routes, lead intake API, and authenticated admin flow
node test_e2e.mjs

# Verify all 13 authenticated admin CMS views
node test_admin.mjs

# Production build check
npm run build
```

---

## 📂 Project Structure

```text
├── data/
│   └── banlgar_ghor.db        # Embedded LibSQL / SQLite database (auto-seeded)
├── public/                    # Static assets & public images
├── src/
│   ├── app/
│   │   ├── admin/             # Authenticated Admin CMS routes
│   │   ├── api/               # Next.js Route Handlers (Auth, Leads, Uploads)
│   │   ├── projects/          # Public portfolio & project slug views
│   │   ├── services/          # Public service guides & slug views
│   │   └── ...                # About, Process, Reviews, Consultation, etc.
│   ├── components/
│   │   ├── forms/             # Consultation & Contact multi-step forms
│   │   ├── layout/            # Navbar, Mobile Menu, Footer
│   │   └── ui/                # Before/After slider, PageHeader, Cards
│   └── lib/
│       ├── auth.ts            # JWT authentication & session cookies
│       └── db/                # LibSQL database client & repository methods
├── supabase/
│   └── migrations/            # Production PostgreSQL & RLS schema
└── next.config.ts             # Image optimization & remote domain rules
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
