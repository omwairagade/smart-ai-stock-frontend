# Smart AI-Based Stock and Supplier Coordination System for MSMEs

A responsive web dashboard that helps small and medium businesses track inventory, coordinate with suppliers, and act on AI-driven demand forecasts and reorder suggestions. The sample business is **Tejas Enterprises**, a construction supplies trader.

This repository contains the **frontend**. It currently runs on in-memory mock data, so it works fully without a backend. See [Connecting to the real backend](#connecting-to-the-real-backend).

## Features

| Page | What it does |
|---|---|
| **Login** | Authentication with route protection for all other pages |
| **Dashboard** | Overview of stock, orders and supplier performance with charts |
| **Inventory** | Product list with search, category filter and stock status badges (healthy, low, out of stock) |
| **Suppliers** | Supplier cards with reliability metrics. Add and edit suppliers through a validated form |
| **Purchase Orders** | Order list with totals, status tracking and status advancement |
| **AI Forecasting** | Demand forecasts per product, trend indicators, AI insights and history charts |
| **Smart Reorder** | AI-generated reorder suggestions with priority and confidence. Approve or reject them |
| **Evaluation** | Quarterly supplier scorecards for quality, delivery, pricing and communication |
| **Communication Log** | Record of calls, emails, meetings and notes with suppliers, with follow-up tracking |
| **Notifications** | Alerts for stock, orders, suppliers and AI updates, with unread count |
| **Reports** | Download PDF and Excel reports generated from live data |
| **Settings** | Business details, profile, email and password changes |

General features:
- Fully responsive layout for desktop and mobile
- Light theme by default, with a dark mode toggle
- Form validation and confirmation dialogs for destructive actions
- Loading skeletons on every data page
- Route-level code splitting, with PDF and Excel libraries loaded only when a report is downloaded

## Tech Stack

- **React** 19 with **Vite** 8
- **Tailwind CSS** 3
- **react-router-dom** 7
- **axios** (HTTP client, ready for backend integration)
- **recharts** (charts)
- **lucide-react** (icons)
- **react-hot-toast** (notifications)
- **jspdf** and **jspdf-autotable** (PDF reports)
- **xlsx** (Excel reports)
- **clsx** (conditional class names)

## Getting Started

**Prerequisites:** Node.js 20.19 or newer (or 22.12+) and npm.

```bash
git clone https://github.com/omwairagade/smart-ai-stock-frontend.git
cd smart-ai-stock-frontend
npm install
npm run dev
```

Open http://localhost:5173/ in your browser.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Demo Login

| Field | Value |
|---|---|
| Email | `om.wairagade@tejasenterprises.com` |
| Password | `admin123` |

Changes made on the Settings page (email, password, business details) and all data edits live in memory only. They reset when the page is refreshed.

## Project Structure

```text
src/
  assets/        Static assets
  components/    Reusable UI components, one folder per feature (auth, common, layout, orders, supplier, ...)
  context/       React context providers (AuthContext, NotificationContext, ThemeContext)
  data/          Sample data files (products, suppliers, orders, forecasts, ...)
  pages/         One file per page (Dashboard, Inventory, Suppliers, ...)
  services/      Data access layer, one service per feature
  utils/         Helpers such as PDF and Excel report generation
```

## Sample Data

All sample data lives in `src/data/` and follows a construction supplies theme.

Product categories:
1. Cement & Concrete
2. Steel & Metal
3. Plumbing
4. Electrical
5. Paints & Finishes
6. Tools & Hardware

Enum values used by the UI:
- Supplier status: `active`, `at-risk`, `inactive`
- Purchase order status: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`
- Reorder priority: `high`, `medium`, `low`
- Reorder status: `pending`, `approved`
- Forecast trend: `up`, `down`, `stable`

Stock status rule: `currentStock === 0` is out of stock, `currentStock <= reorderPoint` is low, otherwise healthy.

## Connecting to the Real Backend

Pages never read the data files directly. They call functions in `src/services/` (for example `supplierService`, `productService`, `orderService`, `reorderService`, `aiService`), and those functions currently return mock data through `simulateRequest` and `simulateError` from `src/services/api.js`.

To connect a real backend or AI API, replace the body of each service function with an `axios` call that returns the same data shape. The pages do not need to change.

## Screenshots

Add screenshots to `docs/screenshots/` using the file names below.

| Page | Screenshot |
|---|---|
| Login | ![Login](docs/screenshots/login.png) |
| Dashboard | ![Dashboard](docs/screenshots/dashboard.png) |
| Inventory | ![Inventory](docs/screenshots/inventory.png) |
| Suppliers | ![Suppliers](docs/screenshots/suppliers.png) |
| Purchase Orders | ![Purchase Orders](docs/screenshots/purchase-orders.png) |
| AI Forecasting | ![AI Forecasting](docs/screenshots/ai-forecasting.png) |
| Smart Reorder | ![Smart Reorder](docs/screenshots/smart-reorder.png) |
| Evaluation | ![Evaluation](docs/screenshots/evaluation.png) |
| Communication Log | ![Communication Log](docs/screenshots/communication-log.png) |
| Notifications | ![Notifications](docs/screenshots/notifications.png) |
| Reports | ![Reports](docs/screenshots/reports.png) |
| Settings | ![Settings](docs/screenshots/settings.png) |

## Team

B.Tech CSE final-year project, 4 members.

| Name | Role |
|---|---|
| Om Wairagade | Frontend Development |
| Tejas Waghmare | Backend & Database Lead |
| Ashish Wable | AI/ML Engineer |
| Prajwal Wagaskar | Integration, Testing & DevOps + Documentation |

## License

This project was built for academic purposes.
