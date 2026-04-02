# Finance Dashboard

A modern, responsive dashboard showcasing fintech data using React, Tailwind CSS, and Recharts.

## Architecture & Built By
- **React 18** via Vite
- **Tailwind CSS** for layout, styling, and dark mode handling through class strategies.
- **Recharts** for elegant data visualization.
- **Lucide React** for cohesive iconography.
- **Context API** handles state (mock transactions, theme, user role).

## Features
- **Dashboard Overview**: Cash Flow and Expense breakdown charts with summarized KPI cards.
- **Transaction Manager**: Filter, sort, and search fake ledger data. 
- **Roles Simulated**: Switch between Viewer (Read-only) and Admin (edit/add functionality).
- **Dark Mode**: Persisted in local storage, along with transaction state changes.
- **Real-time Insights**: Identifies anomalies and aggregates data mathematically to provide dynamic notifications on spending trends.

## How to Run
1. Navigate to the project root where `package.json` exists.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the locally hosted URL, typically `http://localhost:5173`
